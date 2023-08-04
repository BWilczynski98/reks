import prisma from "@/app/lib/prisma"
import { RequestErrors } from "@/app/types/errorsDictionary"
import { Routes } from "@/app/types/routes"
import bcrypt from "bcrypt"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: { label: "password", type: "password", placeholder: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error(RequestErrors.EMPTY_DATA)
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user?.password) {
          throw new Error(RequestErrors.NO_USER_FOUND)
        }

        const passwordMatch = await bcrypt.compare(credentials?.password, user.password)

        if (!passwordMatch) {
          throw new Error(RequestErrors.INCORRECT_PASSWORD)
        }

        return user
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: Routes.LOGIN,
  },
}
