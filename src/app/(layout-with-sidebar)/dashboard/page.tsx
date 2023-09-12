import { TableOfAnimal } from "@/app/components/TableOfAnimal/TableOfAnimal"
import { headline } from "@/app/lib/fonts"

const DashboardPage = () => {
  return (
    <div className="container flex flex-col p-2 gap-5 mx-auto">
      <header className={`${headline.className} flex justify-between`}>
        <h1 className="text-2xl font-semibold text-neutral-800">Panel główny</h1>
      </header>
      <>
        <TableOfAnimal />
      </>
    </div>
  )
}

export default DashboardPage
