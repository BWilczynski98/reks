"use client"
import { useCreateUserMutation } from "@/redux/services/userApi"
import { useState } from "react"

type UserNewAccountParams = {
  email: string
  password: string
}

export default function RegisterPage() {
  const [createUser] = useCreateUserMutation()
  const [userNewAccountData, setUserNewAccountData] = useState<UserNewAccountParams>({
    email: "",
    password: "",
  })

  const registerNewUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createUser(userNewAccountData)
      .unwrap()
      .then((res) => {
        console.log(res)
      })
      .then((error) => {
        console.log(error)
      })
  }

  return (
    <main>
      <form onSubmit={registerNewUser}>
        <div className="flex flex-col w-60">
          <label htmlFor="email">Adres email</label>
          <input
            placeholder="email@email.com"
            className="p-2 border border-gray-700"
            name="email"
            type="email"
            id="email"
            required
            onChange={(e) => setUserNewAccountData(() => ({ ...userNewAccountData, email: e.target.value }))}
          />
        </div>
        <div className="flex flex-col w-60">
          <label htmlFor="password">Hasło</label>
          <input
            placeholder="**********"
            className="p-2 border border-gray-700"
            name="password"
            type="password"
            id="password"
            required
            onChange={(e) => setUserNewAccountData(() => ({ ...userNewAccountData, password: e.target.value }))}
          />
        </div>
        <div>
          <button
            type="submit"
            className="p-4 border border-gray-700"
          >
            zarejestruj
          </button>
        </div>
      </form>
    </main>
  )
}
