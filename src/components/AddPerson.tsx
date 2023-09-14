import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "~/components/Ui/dialog"
import { AddPersonCardWithForm } from "./AddPersonCardWithForm"
import { UserPlus } from "lucide-react"
import { useState } from "react"

const AddPerson = ({ className }: { className?: string | undefined }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className={className}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="bg-slate-400 flex flex-row w-[200px] h-[40px] justify-center items-center gap-1 rounded shadow hover:bg-slate-500 "> <UserPlus /> Dodaj nową osobę</DialogTrigger>
        <DialogContent className="overflow-y-scroll max-h-screen">
          <DialogHeader >
            <DialogDescription >
              {/* close dialog after form submission 
            https://www.radix-ui.com/primitives/docs/components/dialog#close-after-asynchronous-form-submission 
            */}
              <AddPersonCardWithForm setOpen={setOpen} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddPerson