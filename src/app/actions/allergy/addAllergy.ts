"use server"

import { randomBytes } from "crypto"
import { revalidateTag } from "next/cache"
import { FormData } from "../../components/PetProfile/components/Allergy/AllergyForm"

export async function addAllergy(formData: FormData, animalId: string) {
  const allergyId = randomBytes(20).toString("hex")
  await fetch("/api/animal/healthCard/allergies/create", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      animalId,
      allergyId,
      category: formData.category,
      allergen: formData.allergen,
      symptoms: formData.symptoms,
    }),
  })
  revalidateTag("healthCard")
}
