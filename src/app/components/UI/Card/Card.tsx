import React from "react"

export const Card = ({ children }: { children: React.ReactNode }) => {
  return <section className="p-4 bg-white rounded-default">{children}</section>
}
