import type { NextResponse } from "next/server"
import { emptySplitApi as api } from "../emptyApi"

type CreateUserProps = {
  email: string
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
    changeUserPassword: build.mutation<NextResponse, { tokenToResetPassword: string; password: string }>({
      query: ({ tokenToResetPassword, password }) => ({
        url: "/user/reset-password",
        method: "POST",
        body: { tokenToResetPassword, password },
      }),
    }),
    getListOfUsers: build.query<User[], void>({
      query: () => "user/get-all-users",
    }),
    deleteAccount: build.mutation<NextResponse, string>({
      query: (id) => ({
        url: `/user/delete?id=${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useCreateUserMutation,
  useActivateUserAccountMutation,
  useSendResetPasswordLinkMutation,
  useChangeUserPasswordMutation,
  useGetListOfUsersQuery,
  useDeleteAccountMutation,
} = injectedRtkApi
export { injectedRtkApi as userApi }
