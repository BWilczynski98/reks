import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Resetowanie hasła",
  description: "Strona do zresetowania hasła użytkownika",
}

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>
}
