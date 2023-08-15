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
  }),
})

export const { useCreateAnimalMutation } = injectedRtkApi
export { injectedRtkApi as animalApi }
