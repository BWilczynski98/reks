import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Reks - przypominanie hasła",
}

const ForgotPasswordLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

export default ForgotPasswordLayout
