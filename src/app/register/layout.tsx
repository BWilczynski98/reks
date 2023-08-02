import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Reks - rejestracja",
}

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

export default RegisterLayout
