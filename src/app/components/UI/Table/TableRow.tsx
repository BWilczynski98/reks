import React from "react"

export const TableRow = ({ children }: { children: React.ReactNode }) => {
  return <tr className="border-b border-neutral-100">{children}</tr>
}
