"use client"
import { AuthAlert } from "@/components/AuthAlert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Routes } from "@/types/routes"
import { yupResolver } from "@hookform/resolvers/yup"
import { Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup"
import { userAuthFormSchema } from "./schema"
import { useAlert, useDisclose } from "@/hooks"
import { Severity } from "@/types/alert"
import Link from "next/link"

type FormData = yup.InferType<typeof userAuthFormSchema>

export const UserAuthForm = () => {
  const router = useRouter()
  const form = useForm<FormData>({
    resolver: yupResolver(userAuthFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const { alert, handleOpen: handleOpenAlert, handleClose: handleCloseAlert } = useAlert()
  const { state: isLoading, handleOpen: handleStartLoading, handleClose: handleStopLoading } = useDisclose()
  const [passwordIsVisible, setPasswordIsVisible] = useState(false)

  const togglePasswordVisibility = () => setPasswordIsVisible((prev) => !prev)

  const onSubmit: SubmitHandler<FormData> = async (values: FormData) => {
    await handleStartLoading()
    await signIn("credentials", { ...values, redirect: false }).then((callback) => {
      if (callback?.error) {
        console.log(callback?.error)
        handleOpenAlert({ severity: Severity.DESTRUCTIVE, data: callback?.error })
      }

      if (callback?.ok && !callback?.error) {
        router.push(Routes.DASHBOARD)
        handleCloseAlert()
      }
      handleStopLoading
    })
  }

  return (
    <Card className="w-full md:w-2/3 lg:w-1/3">
      <CardHeader>
        <CardTitle>Logowanie</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {alert.isOpen ? (
              <AuthAlert
                variant={alert.severity}
                description={alert.message}
              />
            ) : null}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      required
                      type="email"
                      placeholder="adres@email.com"
                      {...field}
                    />
                  </FormControl>
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
                    <div className="space-y-4">
                      <Input
                        required
                        type={passwordIsVisible ? "text" : "password"}
                        placeholder={passwordIsVisible ? "hasło" : "•••••"}
                        {...field}
                      />
                      <div className="flex items-center space-x-2 justify-end">
                        <Checkbox
                          id="passwordToggle"
                          onClick={togglePasswordVisibility}
                        />
                        <label
                          htmlFor="passwordToggle"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Pokaż hasło
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
                    Logowanie
                  </>
                ) : (
                  "Zaloguj"
                )}
              </Button>
              <div className="text-center text-sm">
                <p>
                  Zapomniałeś/aś hasła?
                  <Link
                    href={Routes.FORGOT_PASSWORD}
                    className="font-semibold cursor-pointer text-primary"
                  >
                    &nbsp;Kliknij tutaj
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
