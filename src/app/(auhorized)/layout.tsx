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
    <div className={`flex ${body.className} max-sm:flex-col w-full`}>
      <div>
        <Sidebar />
        <MobileDrawer />
      </div>

      <div className={cn("w-full h-screen py-20 sm:py-10 sm:overflow-auto")}>{children}</div>
    </div>
  )
}

export default ForgotPasswordLayout
