import { Metadata } from "next"
import React from "react"
import { Sidebar } from "../components/UI"

export const metadata: Metadata = {
  title: "Reks",
}

const ForgotPasswordLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Sidebar>{children}</Sidebar>
    </div>
  )
}

export default ForgotPasswordLayout
