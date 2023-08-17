import { body } from "@/app/lib/fonts"
import React from "react"

type Props = {
  children: React.ReactNode
  title: string
}

export const Chapter = ({ children, title }: Props) => {
  return (
    <div className={body.className}>
      <div className="border-b-[1px] border-neutral-200 my-4 ">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  )
}
