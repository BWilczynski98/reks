import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Panel administratora",
}

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export default RegisterLayout