import { emptySplitApi as api } from "../emptyApi"

type CreateUserProps = {
  email: string
  name: string
}

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (user: CreateUserProps) => ({
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
      query: (user: { email: string }) => ({
        url: "/user/send-reset-password-link",
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
    getListOfUsers: build.query<User[], void>({
      query: () => "user/getAllUsers",
    }),
  }),
})

export const {
  useCreateUserMutation,
  useActivateUserAccountMutation,
  useSendResetPasswordLinkMutation,
  useChangeUserPasswordMutation,
  useGetListOfUsersQuery,
} = injectedRtkApi
export { injectedRtkApi as userApi }
