import React, { Fragment } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./Ui/button";
import { Input } from "./Ui/input";
import type { Person } from "@prisma/client";
import { Dialog, DialogTrigger } from "./Ui/dialog";
import DeletePerson from "./DeletePerson";
import { api } from "~/utils/api";
import type { Inputs } from "./AddPersonCardWithForm";
import { Label } from "./Ui/label";


const PersonDetails = ({ person }: { person: Person }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>(
    {
      // using non-null assertion operator accroding to:
      // https://stackoverflow.com/questions/54496398/typescript-type-string-undefined-is-not-assignable-to-type-string
      defaultValues: {
        firstLastName: person.firstLastName,
        height: person.height!,
        size: person.size!,
        shoeSize: person.shoeSize!,
        waistSize: person.waistSize!,
        note: person.note!,
      }
    }
  );

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    updatePerson.mutate({
      id: person.id,
      firstLastName: data.firstLastName,
      height: data.height,
      size: data.size,
      shoeSize: data.shoeSize,
      waistSize: data.waistSize,
      note: data.note,
    })
  }

  const updatePerson = api.person.modify.useMutation({
    onSuccess: modifiedPerson => console.log(modifiedPerson),
    onError: err => console.log(errors, err),
  })

  return (
    <>
      <div>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col rounded bg-slate-300 p-4 shadow">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="firstLastName">Imię i nazwisko</Label>
              <Input
                id="firstLastName"
                {...register("firstLastName", {
                  required: "Imię i nazwisko nie może być puste",
                })}
                placeholder={person.firstLastName}
                name="firstLastName"
              />
            </div>
            <div>
              <Label htmlFor="height">Wzrost</Label>
              <Input
                id="height"
                {...register("height")}
                placeholder={person.height ?? ""}
                name="height" />
            </div>
            <div>
              <Label htmlFor="size">Rozmiar</Label>
              <Input
                id="size"
                {...register("size")}
                placeholder={person.size ?? ""}
                name="size" />
            </div>
            <div>
              <Label htmlFor="waistSize">Rozmiar w pasie</Label>
              <Input
                id="waistSize"
                {...register("waistSize")}
                placeholder={person.waistSize ?? ""}
                name="waistSize" />
            </div>
            <div>
              <Label htmlFor="shoeSize">Rozmiar buta</Label>
              <Input
                id="shoeSize"
                {...register("shoeSize")}
                placeholder={person.shoeSize ?? ""}
                name="shoeSize" />
            </div>
            <div>
              <Label htmlFor="note">Uwagi</Label>
              <Input
                id="note"
                {...register("note")}
                placeholder={person.note ?? ""}
                name="note" />
            </div>
          </div>
          <div className="flex justify-between py-4">
            <Dialog>
              <DialogTrigger>
                <Button className="bg-red-500 hover:bg-red-700">
                  Usuń osobę
                </Button>
              </DialogTrigger>
              <DeletePerson personToDeleteId={person.id} />
            </Dialog>
            <Button type="submit">Zmień Dane</Button>
          </div>
          <p>Utworzył: {person.authorName} {person.createdAt.toLocaleDateString()}</p>
          <p>Ostatnio zmodyfikował: {person.lastModifiedBy} {person.lastModifiedBy ? person.updatedAt.toLocaleDateString() : ""} </p>
        </form>
      </div>
    </>
  );
};

export default PersonDetails;
