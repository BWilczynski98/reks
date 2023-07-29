import type { NextAuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
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
        const user = {id: "1", email: 'test@test.com', password: '1234'}

        return user
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
}
