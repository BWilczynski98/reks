import type { Allergy } from "@/app/types/health"

export const AllergyItem = ({ category, allergen, symptoms }: Allergy) => {
  return (
    <>
      <div className="bg-neutral-50 p-2 rounded-default flex flex-col gap-3 shadow-md">
        <div>
          <p className="text-sm text-neutral-400">Rodzaj</p>
          <p>{category}</p>
        </div>
        <div>
          <p className="text-sm text-neutral-400">Alergen</p>
          <p>{allergen}</p>
        </div>
        <div>
          <p className="text-sm text-neutral-400">Objawy</p>
          <p>{symptoms}</p>
        </div>
      </div>
    </>
  )
}
