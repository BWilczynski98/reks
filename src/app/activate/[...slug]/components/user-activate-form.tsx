"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useActivateUserAccountMutation } from "@/redux/services/userApi"
import { yupResolver } from "@hookform/resolvers/yup"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup"
import { userActivateFormSchema } from "./schema"
import { useRouter } from "next/navigation"
import { Routes } from "@/types/routes"

type FormData = yup.InferType<typeof userActivateFormSchema>
type Props = {
  token: string
}

export const UserActiavteForm = ({ token }: Props) => {
  const form = useForm({
    resolver: yupResolver(userActivateFormSchema),
    defaultValues: {
      name: "",
      password: "",
      confirmPassword: "",
    },
  })
  const [passwordIsVisible, setPasswordIsVisible] = useState(false)
  const [activateUserAccount, { isLoading }] = useActivateUserAccountMutation()
  const router = useRouter()

  const togglePasswordVisibility = () => setPasswordIsVisible((prev) => !prev)

  const onSubmit: SubmitHandler<FormData> = async (values: FormData) => {
    console.log(values)
    await activateUserAccount({ name: values.name, password: values.password, tokenToActivate: token[0] })
      .unwrap()
      .then((res) => {
        console.log(res)
        form.resetField("name")
        form.resetField("password")
        form.resetField("confirmPassword")
        router.push(Routes.LOGIN)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Aktywacja konta</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imię</FormLabel>
                  <FormControl>
                    <Input
                      required
                      type="text"
                      placeholder="Podaj swoje imię"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Haslo</FormLabel>
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
