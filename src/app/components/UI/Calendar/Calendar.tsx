//  https://react-day-picker.js.org/guides/input-fields
import { cn } from "@/app/lib/cn"
import { body } from "@/app/lib/fonts"
import dayjs from "dayjs"

type Props = {
  label?: string
  error?: boolean
  errorMessage?: string
  value: Date
  onChange: (e: string) => void
  name?: string
  id?: string
}

export const Calendar = ({ label, error, errorMessage, value, onChange }: Props) => {
  return (
    <div className={body.className}>
      <div
        className={cn("text-sm sm:text-base font-medium, text-neutral-500", {
          "text-red-500": error,
        })}
      >
        <label>{label}</label>
      </div>
      <div>
        <input
          type="date"
          value={value ? dayjs(value).format("YYYY-MM-DD") : ""}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full p-3 text-sm sm:text-base outline-none ring-1 ring-neutral-200 ring-inset rounded-default  focus:ring-2 focus:ring-primary-700 shadow-sm",
            {
              "ring-red-500": error,
              "focus:ring-red-500": error,
              "placeholder:text-red-300": error,
            }
          )}
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
