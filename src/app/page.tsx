import { AnimalTable, NavigationBar } from "@/components"
import { Button } from "@/components/ui/button"

import Link from "next/link"

export default function Home() {
  return (
    <main className="container space-y-5 pb-5">
      <NavigationBar />
      <div>
        <Link href={"/add-animal"}>
          <Button className="w-full">Dodaj zwierze</Button>
        </Link>
      </div>
      <section>
        <AnimalTable />
      </section>
    </main>
  )
}
