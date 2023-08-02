import { body } from "@/app/lib/fonts"
import React from "react"
import { LoadingIndicator } from "../LoadingIndicator"

type Props = {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "reset" | "submit"
  loading?: boolean
}

export const Button = ({ children, onClick, disabled, type = "button", loading = false }: Props) => {
  return (
    <button
      className={
        "w-full items-center py-[6px] rounded-default text-sm sm:text-base bg-primary-700  text-neutral-50 enabled:hover:bg-primary-500 duration-150 ease-in-out enabled:hover:shadow-md hover:shadow-primary-200 enabled:active:bg-primary-800 disabled:bg-secondary-100 disabled:text-secondary-300 flex justify-center"
      }
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
    >
      {loading ? <LoadingIndicator /> : <span className={body.className}>{children}</span>}
    </button>
  )
}
