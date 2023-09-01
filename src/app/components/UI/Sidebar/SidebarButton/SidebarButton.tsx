"use client"
import { cn } from "@/app/lib/cn"
import { body } from "@/app/lib/fonts"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

type Props = {
  children: React.ReactNode
  href: string
  icon?: React.ReactNode
}

export const SidebarButton = ({ children, href = "/", icon }: Props) => {
  const pathname = usePathname()
  const isActive = pathname === href
  return (
    <div className={`${body.className} w-full`}>
      <Link href={href}>
        <div
          className={cn(
            "flex items-center w-full gap-2 p-2 text-base font-medium duration-75 ease-in-out text-neutral-800 hover:bg-primary-500 hover:text-neutral-50 rounded-default",
            {
              "text-primary-700": isActive,
            }
          )}
        >
          {icon}
          {children}
        </div>
      </Link>
    </div>
  )
}
