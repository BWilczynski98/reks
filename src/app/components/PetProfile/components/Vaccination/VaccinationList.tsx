import type { Vaccination } from "@/app/types/health"
import { nanoid } from "@reduxjs/toolkit"
import { VaccinationItem } from "./VaccinationItem"

type Props = {
  vaccinations: Vaccination[]
}

export const VaccinationList = ({ vaccinations }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {vaccinations.map((vaccination, index) => (
        <div key={nanoid()}>
          <p className="text-sm text-neutral-400 font-medium mb-2">Szczepienie {index + 1}</p>
          <VaccinationItem
            name={vaccination.name}
            date={vaccination.date}
            term={vaccination.term}
            comments={vaccination.comments}
          />
        </div>
      ))}
    </div>
  )
}
