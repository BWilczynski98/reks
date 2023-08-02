import { body } from "@/app/lib/fonts"
import React from "react"
import cx from "classnames"
import { TextFieldType } from "@/app/types/textfield"

type Props = {
  placeholder?: string
  label?: string
  name?: string
  id?: string
  type?: TextFieldType
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
  type = TextFieldType.TEXT,
  required = false,
  error = false,
  errorMessage,
  value,
  icon,
  handleTogglePasswordVisbility,
  onChange,
}: Props) => {
  return (
    <div className={`${body.className} flex gap-1 flex-col w-full`}>
      <div>
        <label
          htmlFor={name}
          className={cx("text-sm sm:text-base font-medium, text-neutral-950", {
            "text-red-500": error,
          })}
        >
          {label}
        </label>
      </div>
      <div className="relative">
        <input
          className={cx(
            "w-full px-3 py-4 text-sm sm:text-base outline-none ring-1 ring-neutral-400 ring-inset rounded-default  focus:ring-2 focus:ring-primary-700",
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
        />

        <span
          className={cx(
            "text-[18px] sm:text-[24px] absolute top-1/2 right-5 transform -translate-y-1/2 cursor-pointer text-neutral-950",
            { "text-red-500": error }
          )}
          onClick={handleTogglePasswordVisbility}
        >
          {icon}
        </span>
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
