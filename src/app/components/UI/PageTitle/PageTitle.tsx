import { headline } from "@/app/lib/fonts"
import React from "react"

type Props = {
  children: React.ReactNode
}

export const PageTitle = ({ children }: Props) => {
  return <h1 className={`${headline.className} text-2xl font-bold text-center w-full sm:text-3xl`}>{children}</h1>
}
