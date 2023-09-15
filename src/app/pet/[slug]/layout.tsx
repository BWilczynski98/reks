import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Profil zwierzęcia",
}

const ForgotPasswordLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="container mx-auto">{children}</div>
}

export default ForgotPasswordLayout
