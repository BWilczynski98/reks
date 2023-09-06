import { cn } from "@/app/lib/cn"
import React from "react"

export const TableHeaderCell = ({ children, visible = true }: { children?: React.ReactNode; visible?: boolean }) => {
  return (
    <th
      className={cn("font-medium py-4 px-2 max-w-[256px] text-center text-neutral-800", {
        hidden: !visible,
      })}
    >
      {children}
    </th>
  )
}
