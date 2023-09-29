import type { Drug } from "@/app/types/health"

import { nanoid } from "@reduxjs/toolkit"
import { DrugItem } from "./DrugItem"

type Props = {
  drugs: Drug[]
}

export const DrugList = ({ drugs }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {drugs.map((drug, index) => (
        <div key={nanoid()}>
          <p className="text-sm text-neutral-400 font-medium mb-2">Lek {index + 1}</p>
          <DrugItem
            name={drug.name}
            dose={drug.dose}
            interval={drug.interval}
            until={drug.until}
            comments={drug.comments}
          />
        </div>
      ))}
    </div>
  )
}
