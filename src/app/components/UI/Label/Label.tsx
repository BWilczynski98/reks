import { cn } from "@/app/lib/cn"
import React from "react"

type Props = {
  name?: string
  error?: boolean
  children: React.ReactNode
}

export const Label = ({ name, error, children }: Props) => {
  return (
    <label
      htmlFor={name}
      className={cn("text-sm  text-neutral-600 font-semibold", {
        "text-red-500": error,
      })}
    >
      {children}
    </label>
  )
}
