import { AnimalTable, NavigationBar } from "@/components"
import { SkeletonDemo } from "@/components/Skeleton/Skeleton"
import { Suspense } from "react"

export default function Home() {
  return (
    <main className="px-2 sm:container space-y-5 pb-5">
      <NavigationBar />
      <section>
        <Suspense fallback={<SkeletonDemo />}>
          <AnimalTable />
        </Suspense>
      </section>
    </main>
  )
}
