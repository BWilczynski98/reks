import { cn } from "@/app/lib/cn"
import React from "react"
import { flushSync } from "react-dom"

type Props = {
  children: React.ReactNode
  elevation?: "none" | "sm" | "md" | "lg" | "xl"
  fullWidth?: boolean
  className?: string
}

export const Card = ({ children, elevation = "lg", fullWidth, className }: Props) => {
  return (
    <section
      className={cn(`p-4 bg-white rounded-default ${className}`, {
        "shadow-none": elevation === "none",
        "shadow-sm": elevation === "sm",
        "shadow-md": elevation === "md",
        "shadow-lg": elevation === "lg",
        "shadow-xl": elevation === "xl",
        "w-full": fullWidth,
      })}
    >
      {children}
    </section>
  )
}
