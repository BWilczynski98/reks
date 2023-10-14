import type { NextResponse } from "next/server"
import { emptySplitApi as api } from "../emptyApi"

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllAnimal: build.query<Animal[], void>({
      query: () => "animal/get",
      transformResponse: (response: Animal[]) => response.reverse(),
    }),
    createAnimal: build.mutation({
      query: (animal) => ({
        url: "animal/post",
        method: "POST",
        body: animal,
      }),
    }),
    getAllTemporaryHomes: build.query<TemporaryHomeType[], void>({
      query: () => "temporary-home/get",
    }),
    deleteAnimal: build.mutation<NextResponse, { id: string }>({
      query: (id) => ({
        url: "animal/delete",
        method: "DELETE",
        body: id,
      }),
    }),
    getAnimalById: build.query<Animal, string>({
      query: (petId) => ({
        url: `/animal/get/by-animal-id?id=${petId}`,
      }),
    }),
    // getAnimalHealthCard: build.query<HealthRecords, string>({
    //   query: (animalId: string) => ({
    //     url: `/animal/healthCard/get?id=${animalId}`,
    //   }),
    // }),
    // createAllergyRecordInHealthCard: build.mutation<null, AllergyRecord>({
    //   query: (allergy) => ({
    //     url: "animal/healthCard/allergies/create",
    //     method: "POST",
    //     body: allergy,
    //   }),
    // }),
  }),
})

export const {
  useGetAllAnimalQuery,
  // useGetAllAnimalQuery,
  useCreateAnimalMutation,
  useGetAllTemporaryHomesQuery,
  useDeleteAnimalMutation,
  useGetAnimalByIdQuery,
  useLazyGetAnimalByIdQuery,
  // useGetAnimalHealthCardQuery,
  // useCreateAllergyRecordInHealthCardMutation,
} = injectedRtkApi
export { injectedRtkApi as animalApi }
