import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/Ui/dialog"
import { Button } from "./Ui/button"
import { api } from "~/utils/api"
import type { Person } from "@prisma/client";
import Link from "next/link";



const DeletePerson = ({ personToDeleteId }: { personToDeleteId: string }) => {
  const utils = api.useContext();

  const handleDelete = () => deletePerson.mutate({ id: personToDeleteId })

  const deletePerson = api.person.deleteById.useMutation({
    onMutate: async () => {
      await utils.person.getAll.cancel();
    },
    onSuccess: (deletedPerson: Person) => {
      console.log(deletedPerson)
    },
    onSettled() {
      void utils.person.getAll.invalidate();
    }
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Czy na pewno usunąć?</DialogTitle>
        <DialogDescription>
          Na ten moment rozwoju aplikacji usunięcie jest nieodwracalne.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Link href="/zapisy" >
          <Button onClick={handleDelete} type="button">Potwierdź</Button>
        </Link>
      </DialogFooter>
    </DialogContent>
  )
}

export default DeletePerson