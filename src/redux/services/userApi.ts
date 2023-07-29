import { emptySplitApi as api } from "../emptyApi"

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (user) => ({
        url: "/user/register",
        method: "POST",
        body: user,
      }),
    }),
  }),
})

export const { useCreateUserMutation } = injectedRtkApi
export { injectedRtkApi as userApi }
