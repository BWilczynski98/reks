import React from "react"

type Props = {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "reset" | "submit"
}

export const Button = ({ children, onClick, disabled, type = "button" }: Props) => {
  return (
    <button
      className="w-full py-[6px] rounded-default bg-primary-700 text-neutral-50 enabled:hover:bg-primary-500 duration-150 ease-in-out enabled:hover:shadow-md hover:shadow-primary-200 enabled:active:bg-primary-800 disabled:bg-secondary-50 disabled:text-secondary-300"
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  )
}
