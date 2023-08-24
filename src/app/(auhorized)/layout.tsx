import { Metadata } from "next"
import React from "react"
import { Sidebar } from "../components/UI"

export const metadata: Metadata = {
  title: "Reks",
}

const ForgotPasswordLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <div className="max-sm:hidden">
        <Sidebar />
      </div>
      <div className="w-full h-screen overflow-auto">{children}</div>
    </div>
  )
}

export default ForgotPasswordLayout
