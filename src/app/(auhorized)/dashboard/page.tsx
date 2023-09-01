"use client"
import { TableOfAnimal } from "@/app/components/TableOfAnimal/TableOfAnimal"
import { Button } from "@/app/components/UI"
import { headline } from "@/app/lib/fonts"
import Link from "next/link"
import { useRouter } from "next/navigation"

const DashboardPage = () => {
  const router = useRouter()
  return (
    <div className="container flex flex-col gap-5 mx-auto">
      <div className={`${headline.className} flex justify-between`}>
        <h1 className="text-2xl font-semibold text-neutral-800">Panel główny</h1>

        <Button onClick={() => router.push("/adding-animal")}>Nowy wpis</Button>
      </div>
      <div>
        <TableOfAnimal />
      </div>
    </div>
  )
}

export default DashboardPage
