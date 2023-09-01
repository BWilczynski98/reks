import React from "react"

export const TableHeaderCell = ({ children }: { children?: React.ReactNode }) => {
  return <th className="font-medium py-4 px-2 max-w-[256px] text-center text-neutral-800">{children}</th>
}
