import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reks manager - logowanie",
  description: "Reks manager strona logowania użytkownika",
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>
}
