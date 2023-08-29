"use client"
import { PageTitle } from "@/app/components/UI"
import { headline } from "@/app/lib/fonts"
import { useRouter } from "next/navigation"

const DashboardPage = () => {
  const router = useRouter()
  return (
    <div className="container flex flex-col gap-5 mx-auto">
      <div className={headline.className}>
        <h1 className="text-2xl font-semibold text-neutral-800">Panel główny</h1>
      </div>
    </div>
  )
}

export default DashboardPage
