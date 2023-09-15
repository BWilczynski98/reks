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
    getAnimalById: build.query<Animal, string>({
      query: (petId) => ({
        url: `/animal/getById?id=${petId}`,
      }),
    }),
  }),
})

export const { useCreateAnimalMutation, useGetAllAnimalQuery, useGetAnimalByIdQuery } = injectedRtkApi
export { injectedRtkApi as animalApi }
