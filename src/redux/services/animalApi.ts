import { emptySplitApi as api } from "../emptyApi"

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
  }),
})

export const { useCreateAnimalMutation, useGetAllAnimalQuery } = injectedRtkApi
export { injectedRtkApi as animalApi }
