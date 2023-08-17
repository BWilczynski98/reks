import { cn } from "@/app/lib/cn"
import { body } from "@/app/lib/fonts"
import dayjs from "dayjs"
import { Label } from ".."

type Props = {
  label?: string
  error?: boolean
  errorMessage?: string
  value: Date
  onChange: (e: string) => void
  name?: string
  id?: string
}

export const Calendar = ({ label, error, errorMessage, value, onChange, name, id }: Props) => {
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
      <div>
        <input
          type="date"
          name={name}
          id={id}
          value={value ? dayjs(value).format("YYYY-MM-DD") : ""}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full p-3 text-sm sm:text-base outline-none ring-1 ring-neutral-200 ring-inset rounded-default  focus:ring-2 focus:ring-primary-700 shadow-sm",
            {
              "ring-red-500": error,
              "focus:ring-red-500": error,
              "text-red-300": error,
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
