import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Reks - resetowanie hasła",
}

const ResetPasswordLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

export default ResetPasswordLayout
