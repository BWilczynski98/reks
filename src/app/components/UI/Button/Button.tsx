import { body } from "@/app/lib/fonts"
import React from "react"
import { LoadingIndicator } from "../LoadingIndicator"
import { cn } from "@/app/lib/cn"

type Props = {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "reset" | "submit"
  loading?: boolean
  outline?: boolean
  action?: "confirm" | "deny"
}

export const Button = ({
  children,
  onClick,
  disabled,
  type = "button",
  loading = false,
  outline = false,
  action = "confirm",
}: Props) => {
  return (
    <button
      className={cn(
        "w-full items-center py-[6px] rounded-default text-sm sm:text-base bg-primary-700  text-neutral-50  duration-150 ease-in-out enabled:hover:shadow-md hover:shadow-primary-200 0 disabled:bg-secondary-100 disabled:text-secondary-300 flex justify-center",
        {
          "bg-background": outline,
          "text-neutral-700": outline,
          border: outline,
          "border-neutral-300": outline,
          "hover:border-red-500": action === "deny",
          "enabled:hover:bg-primary-500": action !== "deny",
          "enabled:active:bg-primary-800": action !== "deny",
          "hover:text-red-500": action === "deny",
        }
      )}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
    >
      {loading ? <LoadingIndicator /> : <span className={body.className}>{children}</span>}
    </button>
  )
}
