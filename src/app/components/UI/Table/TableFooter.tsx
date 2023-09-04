import React from "react"

export const TableFooter = ({ children }: { children: React.ReactNode }) => {
  return <tfoot className="w-full bg-background">{children}</tfoot>
}
