import { AnimalTable, NavigationBar } from "@/components"
import { Button } from "@/components/ui/button"
import { Suspense } from "react"
import { SkeletonDemo } from "@/components/Skeleton/Skeleton"
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
        <Suspense fallback={<SkeletonDemo />}>
          <AnimalTable />
        </Suspense>
      </section>
    </main>
  )
}
