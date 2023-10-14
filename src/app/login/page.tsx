"use client"
import { useLayoutEffect } from "react"
import { UserAuthForm } from "./components/user-auth-form"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Routes } from "@/types/routes"

export default function LoginPage() {
  const session = useSession()
  const router = useRouter()
  useLayoutEffect(() => {
    if (session?.status === "authenticated") {
      router.push(Routes.DASHBOARD)
    }
  })
  return (
    <main className="flex container h-screen">
      <div className="w-full h-full flex justify-center items-center">
        <UserAuthForm />
      </div>
    </main>
  )
}
