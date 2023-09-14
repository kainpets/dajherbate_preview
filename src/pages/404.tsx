import { Frown } from "lucide-react"
import Link from "next/link"
import Navbar from "~/components/Navbar"
import { Button } from "~/components/Ui/button"
import Main from "~/components/Ui/main"

const Page404 = () => {
  return (
    <Main >
      <Navbar />
      <div className="pt-16 flex flex-col justify-center items-center gap-4">
        <h1>Błąd 404 - nie znaleziono takiej strony. </h1>
        <Frown />
        <Button  >
          <Link href="/">Wróć</Link>
        </Button>
      </div>
    </Main>
  )
}

export default Page404