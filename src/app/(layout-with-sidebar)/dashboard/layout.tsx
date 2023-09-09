import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Panel główny",
}

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export default RegisterLayout
