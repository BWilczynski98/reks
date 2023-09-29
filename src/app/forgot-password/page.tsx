"use client"
import { useLayoutEffect } from "react"
import { UserForgotPasswordForm } from "./components/UserForgotPasswordForm"

import { Routes } from "@/types/routes"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function ForgotPasswordPage() {
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
        <UserForgotPasswordForm />
      </div>
    </main>
  )
}
