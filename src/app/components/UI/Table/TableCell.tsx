import { cn } from "@/app/lib/cn"
import React from "react"

type Props = {
  children: React.ReactNode
  align?: "left" | "center" | "right"
  visible?: boolean
}

export const TableCell = ({ children, align = "left", visible = true }: Props) => {
  return (
    <td
      className={cn("p-2 max-w-[284px] text-left text-neutral-800", {
        "text-center": align === "center",
        "text-right": align === "right",
        hidden: !visible,
      })}
    >
      {children}
    </td>
  )
}
