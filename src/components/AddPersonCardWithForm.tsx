import type { Person } from "@prisma/client";
import * as React from "react"

import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "~/components/Ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/Ui/card"
import { Input } from "~/components/Ui/input"
import { Label } from "~/components/Ui/label"
import { api } from "~/utils/api"

export interface Inputs {
  firstLastName: string,
  firstLastNameRequired: string,
  height: string,
  size: string,
  shoeSize: string,
  waistSize: string,
  note: string,
}

export function AddPersonCardWithForm({ setOpen }: { setOpen: (arg0: boolean) => unknown }) {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  // optimistic updates
  // https://tanstack.com/query/v4/docs/react/guides/optimistic-updates
  // https://create.t3.gg/en/usage/trpc#optimistic-updates
  // https://stackoverflow.com/questions/74671735/optimistic-updates-with-react-query-trpc
  const utils = api.useContext();
  const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

  const onSubmit: SubmitHandler<Inputs> = data => {
    void wait().then(() => setOpen(false));
    createperson.mutate({
      firstLastName: data.firstLastName,
      height: data.height,
      size: data.size,
      shoeSize: data.shoeSize,
      waistSize: data.waistSize,
      note: data.note,
    })
  };

  const createperson = api.person.create.useMutation({
    async onMutate(newPerson) {
      // Cancel outgoing fetches (so they don't overwrite our optimistic update)
      await utils.person.getAll.cancel();

      // Get the data from the queryCache
      const prevData = utils.person.getAll.getData();

      // Optimistically update the data with new Person
      utils.person.getAll.setData(undefined, (old: Person[] | undefined) => [...(old ?? []), newPerson] as Person[]);

      // Return the previous data so we can revert if something goes wrong
      return { prevData };
    },
    onError(err, newPerson, ctx) {
      console.log(errors, err);
      // If the mutation fails, use the context-value from onMutate
      utils.person.getAll.setData(undefined, ctx?.prevData);
    },
    onSettled() {
      // Sync with server once mutation has settled
      void utils.person.getAll.invalidate();
    }
  });


  return (
    <Card className="bg-slate-300">
      <CardHeader>
        <CardTitle>Dodaj nową osobę</CardTitle>
        <CardDescription>Podaj dane</CardDescription>
      </CardHeader>
      <CardContent>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="firstLastName">Imię i nazwisko</Label>
              <Input id="firstLastName" {...register("firstLastName", { required: true })} placeholder="Jan Kowalski" />
              <Label htmlFor="height">Wzrost</Label>
              <Input id="height" {...register("height")} placeholder="170" />
              <Label htmlFor="size">Rozmiar</Label>
              <Input id="size" {...register("size")} placeholder="XL" />
              <Label htmlFor="waistSize">Rozmiar w pasie</Label>
              <Input id="waistSize" {...register("waistSize")} placeholder="Obwód w pasie w cm" />
              <Label htmlFor="shoeSize">Rozmiar buta</Label>
              <Input id="shoeSize" {...register("shoeSize")} placeholder="40" />
              <Label htmlFor="notes">Uwagi</Label>
              <Input id="notes" {...register("note")} placeholder="roszczeniowy, niemiły..." />
            </div>
            <div className="flex flex-col space-y-1.5">
            </div>
          </div>
          <Button className="w-full" type="submit">Dodaj</Button>
        </form>
      </CardContent>
    </Card>
    
  )
}
