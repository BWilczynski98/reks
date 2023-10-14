import { buttonVariants } from "@/components/ui/button"
import { Routes } from "@/types/routes"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="w-scren h-screen flex flex-col justify-center items-center">
      <p>Nie znaleziono profilu zwierzęcia.</p>
      <Link
        href={Routes.DASHBOARD}
        className={buttonVariants({ variant: "link" })}
      >
        Strona główna
      </Link>
    </div>
  )
}
