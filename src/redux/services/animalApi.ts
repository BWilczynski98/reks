import { Allergy, AllergyCategory, HealthRecords } from "@/app/types/health"
import { emptySplitApi as api } from "../emptyApi"

type AllergyRecord = {
  animalId: string
  category: string
  allergen: string
  symptoms: string
}

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    createAnimal: build.mutation({
      query: (animal) => ({
        url: "animal/create",
        method: "POST",
        body: animal,
      }),
    }),
    getAllAnimal: build.query<Animal[], void>({
      query: () => "animal/get",
    }),
    getAnimalById: build.query<Animal, string>({
      query: (petId) => ({
        url: `/animal/getById?id=${petId}`,
      }),
    }),
    getAnimalHealthCard: build.query<HealthRecords, string>({
      query: (animalId: string) => ({
        url: `/animal/healthCard/get?id=${animalId}`,
      }),
    }),
    createAllergyRecordInHealthCard: build.mutation<null, AllergyRecord>({
      query: (allergy) => ({
        url: "animal/healthCard/allergies/create",
        method: "POST",
        body: allergy,
      }),
    }),
  }),
})

export const {
  useCreateAnimalMutation,
  useGetAllAnimalQuery,
  useGetAnimalByIdQuery,
  useGetAnimalHealthCardQuery,
  useCreateAllergyRecordInHealthCardMutation,
} = injectedRtkApi
export { injectedRtkApi as animalApi }
