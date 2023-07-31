import { headline } from "@/app/lib/fonts"
import React from "react"

export const Logo = () => {
  return (
    <div className={headline.className}>
      <h1 className="text-2xl font-bold">
        <span className="text-primary-700">Reks&nbsp;</span>Manager
      </h1>
    </div>
  )
}
