"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup"
import { userResetPasswordFormSchema } from "./schema"

import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useChangeUserPasswordMutation } from "@/redux/services/userApi"
import { useRouter } from "next/navigation"
import { Routes } from "@/types/routes"

type Props = {
  token: string
}
type FormData = yup.InferType<typeof userResetPasswordFormSchema>

export const UserResetPasswordForm = ({ token }: Props) => {
  const router = useRouter()
  const [passwordIsVisible, setPasswordIsVisible] = useState(false)
  const form = useForm({
    resolver: yupResolver(userResetPasswordFormSchema),
    defaultValues: { password: "", confirmPassword: "" },
  })
  const [changeUserPassword, { isLoading }] = useChangeUserPasswordMutation()

  const onSubmit: SubmitHandler<FormData> = async (values: FormData) => {
    await changeUserPassword({ tokenToResetPassword: token, password: values.password })
      .then((res) => {
        //FIXME: when api return error, still then working and handle this code
        router.push(Routes.LOGIN)
      })
      .catch((err) => console.log(err))
  }

  const togglePasswordVisibility = () => setPasswordIsVisible((prev) => !prev)

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Resetowanie hasła</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hasło *</FormLabel>
                  <FormControl>
                    <Input
                      required
                      type={passwordIsVisible ? "text" : "password"}
                      placeholder={passwordIsVisible ? "hasło" : "•••••"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Powtórz hasło</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <Input
                        required
                        type={passwordIsVisible ? "text" : "password"}
                        placeholder={passwordIsVisible ? "hasło" : "•••••"}
                        {...field}
                      />
                      <FormMessage />
                      <div className="flex items-center space-x-2 justify-end">
                        <Checkbox
                          id="passwordToggle"
                          onClick={togglePasswordVisibility}
                        />
                        <label
                          htmlFor="passwordToggle"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Pokaż hasła
                        </label>
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="space-y-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Aktywowanie
                  </>
                ) : (
                  "Aktywuj konto"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
