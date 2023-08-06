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
    forgotPassowrd: build.mutation({
      query: (email) => ({
        url: "/send",
        method: "Post",
        body: email,
      }),
    }),
  }),
})

export const { useCreateUserMutation, useForgotPassowrdMutation } = injectedRtkApi
export { injectedRtkApi as userApi }
