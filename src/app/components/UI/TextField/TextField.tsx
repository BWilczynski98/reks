import { cn } from "@/app/lib/cn"
import { body } from "@/app/lib/fonts"
import { TextFieldType } from "@/app/types/textfield"
import React from "react"
import { Label } from "../Label"

type Props = {
  placeholder?: string
  label?: string
  name?: string
  id?: string
  type?: TextFieldType
  required?: boolean
  error?: boolean
  errorMessage?: string
  value: string | number | undefined
  onChange: (e: string) => void
  icon?: React.ReactNode
  handleTogglePasswordVisbility?: () => void
  minLength?: number
  maxLength?: number
  max?: number
}

export const TextField = ({
  placeholder,
  label,
  name,
  id,
  type = TextFieldType.TEXT,
  required = false,
  error = false,
  errorMessage,
  value,
  icon,
  handleTogglePasswordVisbility,
  onChange,
  minLength,
  maxLength,
  max,
}: Props) => {
  return (
    <div className={`${body.className} flex gap-1 flex-col w-full`}>
      <div>
        <Label
          name={name}
          error={error}
        >
          {label}
        </Label>
      </div>
      <div className="relative">
        <input
          className={cn(
            "w-full p-3 text-sm sm:text-base outline-none ring-1 ring-neutral-200 ring-inset rounded-default  focus:ring-2 focus:ring-primary-700 shadow-sm",
            {
              "pl-3": icon,
              "pr-12": icon,
              "ring-red-500": error,
              "focus:ring-red-500": error,
              "placeholder:text-red-300": error,
            }
          )}
          name={name}
          id={id}
          type={type}
          required={required}
          placeholder={placeholder}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
          max={max}
        />
        {icon ? (
          <span
            className={cn(
              "text-[18px] sm:text-[24px] absolute top-1/2 right-5 transform -translate-y-1/2 cursor-pointer text-neutral-400",
              { "text-red-500": error }
            )}
            onClick={handleTogglePasswordVisbility}
          >
            {icon}
          </span>
        ) : null}
      </div>
      {error ? (
        <div>
          <p className="text-sm text-red-500">{errorMessage}</p>
        </div>
      ) : null}
    </div>
  )
}

/*  */
