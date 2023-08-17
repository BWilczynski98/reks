"use client"
import { Button } from "@components/UI"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

const DashboardPage = () => {
  const router = useRouter()
  return (
    <div className="flex justify-between w-1/4">
      <div className="w-full">
        <Button onClick={signOut}>Wyloguj</Button>
      </div>
      <div className="w-full">
        <Button onClick={() => router.push("/adding-animal")}>dodaj zwierze</Button>
      </div>
    </div>
  )
}

export default DashboardPage
