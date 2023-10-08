import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reks manager - przypomnij hasło",
  description: "Reks manager strona przypominania hasła użytkownika",
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>
}
