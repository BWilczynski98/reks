export const dynamic = "force-dynamic"

import { AnimalTable, NavigationBar } from "@/components"
import { Button } from "@/components/ui/button"

import Link from "next/link"
import { baseUrl } from "./api/baseUrl"
import useSWR from "swr"

async function getData() {
  const res = await fetch(`${baseUrl}/api/animal/get`, {
    next: { tags: ["animal-collection"] },
  }).then((res) => res.json())

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  return res
}

export default async function Home() {
  const data = await getData()
  // const {} = useSWR("api")
  return (
    <main className="container space-y-5 pb-5">
      <NavigationBar />
      <div>
        <Link href={"/add-animal"}>
          <Button className="w-full">Dodaj zwierze</Button>
        </Link>
      </div>
      <section>
        <AnimalTable data={data} />
      </section>
    </main>
  )
}
