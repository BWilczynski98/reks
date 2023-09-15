import { cn } from "@/app/lib/cn"
import Link from "next/link"
import React from "react"

type Props = {
  children: React.ReactNode
  align?: "left" | "center" | "right"
  visible?: boolean
  link?: boolean
  id?: string
}

export const TableCell = ({ children, align = "center", visible = true, link, id }: Props) => {
  const petId = id
  return (
    <td
      className={cn("p-2 max-w-[284px] text-left text-neutral-800", {
        "text-center": align === "center",
        "text-right": align === "right",
        hidden: !visible,
      })}
    >
      {link ? (
        <Link
          className="line-clamp-1 underline underline-offset-4"
          href={`/pet/${petId}`}
        >
          {children}
        </Link>
      ) : (
        <div className="line-clamp-1">{children}</div>
      )}
    </td>
  )
}
