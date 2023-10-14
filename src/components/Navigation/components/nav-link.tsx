"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

type TypeNavLink = {
  label: string
  href: string
  icon?: React.ReactNode
}

export const NavLink = ({ label, href, icon }: TypeNavLink) => {
  const currentPath = usePathname()

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center space-x-2 hover:bg-accent duration-150 ease-in rounded-md p-2 w-full font-semibold",
        {
          "bg-accent": currentPath === href,
        }
      )}
    >
      <div>{icon}</div>
      <div>{label}</div>
    </Link>
  )
}
