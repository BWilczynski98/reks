import { cn } from "@/app/lib/cn"
import { Severity } from "@/app/types/alert"
import React from "react"

type Props = {
  children: React.ReactNode
  severity: Severity
}

export const Badge = ({ children, severity }: Props) => {
  return (
    <div
      className={cn("bg-neutral-200 rounded-default  ring-inset ring-2", {
        "bg-green-100": severity === Severity.SUCCESS,
        "ring-green-200": severity === Severity.SUCCESS,
        "bg-red-100": severity === Severity.ERROR,
        "ring-red-200": severity === Severity.ERROR,
      })}
    >
      {children}
    </div>
  )
}
