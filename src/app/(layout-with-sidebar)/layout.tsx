import { Metadata } from "next"
import React from "react"
import { Sidebar } from "../components/UI"
import { MobileDrawer } from "../components/UI/MobileDrawer"
import { cn } from "../lib/cn"
import { body } from "../lib/fonts"

export const metadata: Metadata = {
  title: "Reks",
}

const ForgotPasswordLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={`flex ${body.className} max-sm:flex-col w-full`}>
      <aside>
        <Sidebar />
        <MobileDrawer />
      </aside>
      <section className={cn("w-full h-screen py-20 sm:py-10 sm:overflow-auto")}>{children}</section>
    </main>
  )
}

export default ForgotPasswordLayout
