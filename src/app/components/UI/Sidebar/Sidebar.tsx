import React from "react"

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <div className="w-64 h-screen bg-primary-400">Jakiś tekst</div>
      <div className="w-full h-screen overflow-y-scroll">{children}</div>
    </div>
  )
}
