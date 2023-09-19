import type { Drug } from "@/app/types/health"
import dayjs from "dayjs"
import { MdClose } from "react-icons/md"
require("dayjs/locale/pl")

export const DrugItem = ({ name, dose, interval, until, comments }: Drug) => {
  const relativeTime = require("dayjs/plugin/relativeTime")
  dayjs.extend(relativeTime)
  return (
    <div className="bg-neutral-50 px-4 py-2 rounded-default flex flex-col gap-3 shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-neutral-400">Nazwa</p>
          <p>{name}</p>
        </div>
        <div className="cursor-pointer text-neutral-400 hover:text-red-500 duration-100 ease-in-out text-lg">
          <MdClose />
        </div>
      </div>
      <div>
        <p className="text-sm text-neutral-400">Dawka</p>
        <p>{dose}</p>
      </div>
      <div>
        <p className="text-sm text-neutral-400">Pora podawania</p>
        <p>{interval}</p>
      </div>
      <div>
        <p className="text-sm text-neutral-400">Podawać do</p>
        <p>{dayjs(until).locale("pl").format("DD MMMM YYYY")}</p>
      </div>
      <div>
        <p className="text-sm text-neutral-400">Uwagi</p>
        {comments ? <p>{comments}</p> : <p>Brak</p>}
      </div>
    </div>
  )
}
