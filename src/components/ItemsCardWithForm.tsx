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

interface Inputs {
  clothes: string,
  shoes: string,
  underwear: string,
  hygieneProducts: string,
  accessories: string,
  equipment: string,
  other: string
}

export function ItemsCardWithForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data);
  };


  return (
    <Card className="bg-slate-300 max-w-xl">
      <CardHeader>
        <CardTitle>Dodaj zapis</CardTitle>
        <CardDescription>Podaj dane zlecenia</CardDescription>
      </CardHeader>
      <CardContent className="max-w-sm">
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="shoes">Buty</Label>
              <Input id="shoes" {...register("shoes")} placeholder="addidasy..." />
              <Label htmlFor="clothes">Ciuchy</Label>
              <Input id="clothes" {...register("clothes")} placeholder="sweter..." />
              <Label htmlFor="underwear">Bielizna</Label>
              <Input id="underwear" {...register("underwear")} placeholder="majtki..." />
              <Label htmlFor="hygieneProducts">Produkty higieny osobistej</Label>
              <Input id="hygieneProducts" {...register("hygieneProducts")} placeholder="szczoteczka do zębów..." />
              <Label htmlFor="accessories">Akscesoria</Label>
              <Input id="accessories" {...register("accessories")} placeholder="szczoteczka do zębów..." />
              <Label htmlFor="equipment">Sprzęt</Label>
              <Input id="equipment" {...register("equipment")} placeholder="plecak, namiot..." />
              <Label htmlFor="other">Inne</Label>
              <Input id="other" {...register("other")} placeholder="szczoteczka do zębów..." />
            </div>
          </div>
          <Button type="submit" variant={"outline"}>Dodaj</Button>
        </form>
      </CardContent>
    </Card>
  )
}
