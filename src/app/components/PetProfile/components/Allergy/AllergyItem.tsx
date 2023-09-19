import type { Allergy } from "@/app/types/health"
import { MdClose } from "react-icons/md"

export const AllergyItem = ({ category, allergen, symptoms }: Allergy) => {
  return (
    <>
      <div className="bg-neutral-50 px-4 py-2 rounded-default flex flex-col gap-3 shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-neutral-400">Rodzaj</p>
            <p>{category}</p>
          </div>
          <div className="cursor-pointer text-neutral-400 hover:text-red-500 duration-100 ease-in-out text-lg">
            <MdClose />
          </div>
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
