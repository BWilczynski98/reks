//FIXME: In devmode "Cannot access 'Select' before initialization"
"use client"
import { useComponentVisible } from "@/app/hooks"
import { cn } from "@/app/lib/cn"
import { body } from "@/app/lib/fonts"
import { Type } from "@prisma/client"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { BiChevronDown, BiChevronUp } from "react-icons/bi"
import { Label } from ".."

type Props = {
  label?: string
  placeholder?: string
  name?: string
  id?: string
  value: string | number
  options: string[] | number[]
  onChange: (args: any) => void
  error?: boolean
  errorMessage?: string
  size?: "small" | "standard"
  fullWidth?: boolean
  tickOff?: boolean
}

export const Select = ({
  label,
  placeholder,
  name,
  id,
  value,
  options,
  onChange,
  error,
  errorMessage,
  size = "standard",
  fullWidth,
  tickOff,
}: Props) => {
  const [height, setHeight] = useState(0)
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

  useEffect(() => {
    if (ref.current != null) {
      setHeight(ref.current.offsetHeight)
    }
  }, [ref])

  const smallSize = size === "small"
  const standardSize = size === "standard"

  const handleToggleComponentVisible = () => {
    setIsComponentVisible((prev: boolean) => !prev)
  }
  //FIXME: When click Chevron icon is clicked, the ring does not change state to focused and thus does not change to the primary color
  return (
    <div className={cn(`${body.className} flex gap-1 flex-col`, { "w-full": fullWidth })}>
      {label ? (
        <div>
          <Label
            name={name}
            error={error}
          >
            {label}
          </Label>
        </div>
      ) : null}

      <div className="relative">
        <div className="cursor-pointer">
          <input
            ref={ref}
            onClick={handleToggleComponentVisible}
            readOnly
            className={cn(
              "group w-full p-3 text-sm sm:text-base outline-none ring-1 ring-neutral-200 ring-inset rounded-default focus:ring-2 focus:ring-primary-700 shadow-sm relative cursor-pointer peer",
              {
                "ring-red-500": error,
                "focus:ring-red-500": error,
                "placeholder:text-red-300": error,
                "p-3": standardSize,
                "py-1": smallSize,
                "px-2": smallSize,
              }
            )}
            placeholder={placeholder}
            name={name}
            id={id}
            value={value}
          />
          <div
            className="absolute z-20 -translate-y-1/2 top-1/2 right-3 text-neutral-950 peer-[.is-focus]:"
            onClick={handleToggleComponentVisible}
          >
            {isComponentVisible ? <BiChevronUp /> : <BiChevronDown />}
          </div>
        </div>
        <div
          className={cn(
            `overflow-hidden ring-1 ring-inset ring-neutral-200 rounded-default absolute top-[${height}] w-full z-20 bg-white shadow-sm`,
            {
              hidden: !isComponentVisible,
            }
          )}
        >
          <ul>
            {options.map((item) => {
              return (
                <li
                  key={item}
                  className={cn("px-3 py-1 cursor-pointer hover:bg-primary-700 hover:text-neutral-100", {
                    "text-primary-700": item === value,
                    "font-medium": item === value,
                  })}
                  onClick={() => {
                    if (tickOff && item === value) {
                      return onChange("")
                    }

                    return onChange(item)
                  }}
                >
                  {item}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      {error ? (
        <div>
          <p className="text-sm text-red-500">{errorMessage}</p>
        </div>
      ) : null}
    </div>
  )
}
