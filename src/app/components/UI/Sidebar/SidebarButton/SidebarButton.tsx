import { body } from "@/app/lib/fonts"
import Link from "next/link"
import React from "react"

type Props = {
  children: React.ReactNode
  href: string
  icon?: React.ReactNode
}

export const SidebarButton = ({ children, href = "/", icon }: Props) => {
  return (
    <div className={`${body.className} w-full`}>
      <Link href={href}>
        <div className="flex items-center w-full gap-2 p-2 font-medium duration-75 ease-in-out text-neutral-600 hover:bg-primary-500 hover:text-neutral-50 rounded-default">
          {icon}
          {children}
        </div>
      </Link>
    </div>
  )
}
