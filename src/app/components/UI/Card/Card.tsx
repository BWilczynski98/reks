import React from "react"

export const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-4 bg-white rounded-default">{children}</div>
}
