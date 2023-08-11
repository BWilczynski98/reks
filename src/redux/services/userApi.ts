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
    activateUserAccount: build.mutation({
      query: (user) => ({
        url: "/user/activate",
        method: "POST",
        body: user,
      }),
    }),
    sendResetPasswordLink: build.mutation({
      query: (user) => ({
        url: "/user/sendResetPasswordLink",
        method: "POST",
        body: user,
      }),
    }),
    changeUserPassword: build.mutation({
      query: (user) => ({
        url: "/user/reset-password",
        method: "POST",
        body: user,
      }),
    }),
  }),
})

export const {
  useCreateUserMutation,
  useActivateUserAccountMutation,
  useSendResetPasswordLinkMutation,
  useChangeUserPasswordMutation,
} = injectedRtkApi
export { injectedRtkApi as userApi }
