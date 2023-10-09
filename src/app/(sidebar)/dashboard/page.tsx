import { AnimalTable } from "@/components"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Home() {
  return (
    <div className="px-2 sm:container space-y-5 h-screen items-center">
      <AnimalTable />
    </div>
  )
}
