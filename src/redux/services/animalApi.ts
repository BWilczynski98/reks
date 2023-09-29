import { emptySplitApi as api } from "../emptyApi"

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllAnimal: build.query<[], void>({
      query: () => "animal/get",
    }),
    createAnimal: build.mutation({
      query: (animal) => ({
        url: "animal/post",
        method: "POST",
        body: animal,
      }),
    }),
    // getAnimalById: build.query<Animal, string>({
    //   query: (petId) => ({
    //     url: `/animal/getById?id=${petId}`,
    //   }),
    // }),
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
  // useGetAnimalByIdQuery,
  // useGetAnimalHealthCardQuery,
  // useCreateAllergyRecordInHealthCardMutation,
} = injectedRtkApi
export { injectedRtkApi as animalApi }
