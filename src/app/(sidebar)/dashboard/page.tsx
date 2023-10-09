import { AnimalTable } from "@/components"

export default function Home() {
  return (
    <main className="px-2 sm:container space-y-5 pb-5">
      <section>
        <AnimalTable />
      </section>
    </main>
  )
}
