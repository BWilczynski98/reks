import { cn } from "@/app/lib/cn"
import { AnimalStatus } from "@/app/types/animal"
import React from "react"

type Props = {
  children: React.ReactNode
  severity: AnimalStatus
}

export const StatusBadge = ({ children, severity }: Props) => {
  const quarantine = severity === AnimalStatus.QUARANTINE
  const adapted = severity === AnimalStatus.ADAPTED
  const forAdoption = severity === AnimalStatus.FOR_ADOPTION

  return (
    <div
      className={cn("text-center bg-neutral-300 rounded-default text-neutral-50", {
        "bg-red-500": quarantine,
        "bg-green-500": adapted,
        "bg-sky-500": forAdoption,
      })}
    >
      {children}
    </div>
  )
}
