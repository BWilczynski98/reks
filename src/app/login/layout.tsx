import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Reks - logowanie",
}

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

export default LoginLayout
