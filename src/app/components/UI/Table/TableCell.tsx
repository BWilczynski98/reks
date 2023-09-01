import { cn } from "@/app/lib/cn"
import React from "react"

type Props = {
  children: React.ReactNode
  align?: "left" | "center" | "right"
}

export const TableCell = ({ children, align = "left" }: Props) => {
  return (
    <td
      className={cn("px-2 py-4 max-w-[284px] text-left text-neutral-800", {
        "text-center": align === "center",
        "text-right": align === "right",
      })}
    >
      {children}
    </td>
  )
}
