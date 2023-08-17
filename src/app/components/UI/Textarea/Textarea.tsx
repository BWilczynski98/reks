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
  error?: boolean
  errorMessage?: string
  value: string | number | undefined
  onChange: (e: string) => void
  rows?: number
  cols?: number
}

export const Textarea = ({
  placeholder,
  label,
  name,
  id,
  error = false,
  errorMessage,
  value,
  rows,
  cols,
  onChange,
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
        <textarea
          className={cn(
            "w-full p-3 text-sm sm:text-base outline-none ring-1 ring-neutral-200 ring-inset rounded-default  focus:ring-2 focus:ring-primary-700 shadow-sm",
            {
              "ring-red-500": error,
              "focus:ring-red-500": error,
              "placeholder:text-red-300": error,
            }
          )}
          name={name}
          id={id}
          placeholder={placeholder}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          cols={cols}
        />
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
