import { TableOfAnimal } from "@/app/components/TableOfAnimal/TableOfAnimal"
import { headline } from "@/app/lib/fonts"

const DashboardPage = () => {
  return (
    <div className="container flex flex-col gap-5 mx-auto">
      <div className={`${headline.className} flex justify-between`}>
        <h1 className="text-2xl font-semibold text-neutral-800">Panel główny</h1>
      </div>
      <div>
        <TableOfAnimal />
      </div>
    </div>
  )
}

export default DashboardPage
