import React from "react"

export const TableHead = ({ children }: { children: React.ReactNode }) => {
  return <thead className="border-b border-neutral-200 w-full bg-background">{children}</thead>
}
