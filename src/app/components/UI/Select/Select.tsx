import { useComponentVisible } from "@/app/hooks"
import { cn } from "@/app/lib/cn"
import { body } from "@/app/lib/fonts"
import { Type } from "@prisma/client"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { BiChevronDown, BiChevronUp } from "react-icons/bi"

type Props = {
  label?: string
  placeholder?: string
  name?: string
  id?: string
  value: string | number
  options: string[]
  onChange: (e: string) => void
  error?: boolean
  errorMessage?: string
}

export const Select = ({ label, placeholder, name, id, value, options, onChange, error, errorMessage }: Props) => {
  const [height, setHeight] = useState(0)
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

  useEffect(() => {
    if (ref.current != null) {
      setHeight(ref.current.offsetHeight)
    }
  }, [])

  return (
    <div className={`${body.className} flex gap-1 flex-col w-full`}>
      <div>
        <label
          className={cn("text-sm sm:text-base font-medium, text-neutral-500", {
            "text-red-500": error,
          })}
        >
          {label}
        </label>
      </div>
      <div className="relative">
        <div className="cursor-pointer">
          <input
            ref={ref}
            onClick={() => setIsComponentVisible((prev: boolean) => !prev)}
            readOnly
            className={cn(
              "w-full p-3 text-sm sm:text-base outline-none ring-1 ring-neutral-200 ring-inset rounded-default  focus:ring-2 focus:ring-primary-700 shadow-sm relative cursor-pointer",
              {
                "ring-red-500": error,
                "focus:ring-red-500": error,
                "placeholder:text-red-300": error,
              }
            )}
            placeholder={placeholder}
            name={name}
            id={id}
            value={value}
          />
          <div className="absolute z-20 -translate-y-1/2 top-1/2 right-3 text-neutral-950">
            {isComponentVisible ? <BiChevronUp /> : <BiChevronDown />}
          </div>
        </div>
        <div
          className={cn(
            `overflow-hidden ring-1 ring-inset ring-neutral-200 rounded-default absolute top-[${height}] w-full z-20 bg-white`,
            {
              hidden: !isComponentVisible,
            }
          )}
        >
          {options.map((item) => {
            return (
              <div
                key={item}
                className="px-3 py-1 cursor-pointer hover:bg-primary-700 hover:text-neutral-100"
                onClick={() => onChange(item)}
              >
                {item}
              </div>
            )
          })}
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
