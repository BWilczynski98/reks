import React from "react"

export const TableRow = ({ children }: { children: React.ReactNode }) => {
  return <tr className="border-b border-neutral-100 even:bg-neutral-50/50">{children}</tr>
}
