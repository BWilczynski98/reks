import type { Allergy } from "@/app/types/health"
import { AllergyItem } from "./AllergyItem"
import { nanoid } from "@reduxjs/toolkit"

type Props = {
  allergies: Allergy[]
}

export const AllergyList = ({ allergies }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {allergies.map((allergy, index) => (
        <div key={nanoid()}>
          <p className="text-sm text-neutral-400 font-medium mb-2">Alergia {index + 1}</p>
          <AllergyItem
            category={allergy.category}
            allergen={allergy.allergen}
            symptoms={allergy.symptoms}
          />
        </div>
      ))}
    </div>
  )
}
