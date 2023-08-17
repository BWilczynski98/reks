import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Formularz dodawania zwierzęcia",
}

const ForgotPasswordLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="container py-4 mx-auto">{children}</div>
}

export default ForgotPasswordLayout
