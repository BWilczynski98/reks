import { body } from "@/app/lib/fonts"
import React from "react"

type Props = {
  placeholder?: string
  label?: string
  name?: string
  id?: string
  type?: "text" | "password" | "email" | "number"
  required?: boolean
  error?: boolean
  errorMessage?: string
  value: string | number
  onChange: (e: string) => void
  icon?: React.ReactNode
  handleTogglePasswordVisbility?: () => void
}

export const TextField = ({
  placeholder,
  label,
  name,
  id,
  type = "text",
  required = false,
  error = false,
  errorMessage,
  value,
  icon,
  handleTogglePasswordVisbility,
  onChange,
}: Props) => {
  return (
    <div className={`${body.className} flex gap-1 flex-col w-[80vh] max-w-[254px]`}>
      <div>
        <label
          htmlFor={name}
          className={`text-sm sm:text-base font-medium ${error ? "text-red-500" : "text-neutral-950 "}`}
        >
          {label}
        </label>
      </div>
      <div className="relative">
        <input
          className={`w-full px-3 py-4 text-sm sm:text-base outline-none ring-1 ring-neutral-400 ring-inset focus:ring-2 rounded-default 
          ${!error && "focus:ring-primary-700"} ${error ? "ring-red-500" : "ring-neutral-400"} ${
            error ? "placeholder:text-red-300" : "placeholder:text-neutral-200"
          } text-neutral-950`}
          name={name}
          id={id}
          type={type}
          required={required}
          placeholder={placeholder}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        <span
          className={`text-[18px] sm:text-[24px] absolute top-1/2 right-5 transform -translate-y-1/2 cursor-pointer ${
            error ? "text-red-500" : "text-neutral-950"
          }`}
          onClick={handleTogglePasswordVisbility}
        >
          {icon}
        </span>
      </div>
      {error ? (
        <div>
          <p className="text-base text-red-500">{errorMessage}</p>
        </div>
      ) : null}
    </div>
  )
}

/*  */
