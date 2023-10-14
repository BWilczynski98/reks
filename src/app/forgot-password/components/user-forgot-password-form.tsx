"use client"
import { AuthAlert } from "@/components"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAlert, useDisclose } from "@/hooks"
import { useSendResetPasswordLinkMutation } from "@/redux/services/userApi"
import { Severity } from "@/types/alert"
import { Routes } from "@/types/routes"
import { yupResolver } from "@hookform/resolvers/yup"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { UserForgotPasswordFormData, userForgotPasswordFormSchema } from "./schema"

export const UserForgotPasswordForm = () => {
  const form = useForm<UserForgotPasswordFormData>({
    resolver: yupResolver(userForgotPasswordFormSchema),
    defaultValues: { email: "" },
  })
  const { state: isLoading, handleOpen: handleStartLoading, handleClose: handleStopLoading } = useDisclose()
  const { alert, handleOpen: handleOpenAlert } = useAlert()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [userEmail, setUserEmail] = useState<string>()
  const [sendResetPasswordLink] = useSendResetPasswordLinkMutation()

  const onSubmit: SubmitHandler<UserForgotPasswordFormData> = async (formData: UserForgotPasswordFormData) => {
    await handleStartLoading()
    await sendResetPasswordLink(formData)
      .unwrap()
      .then(() => {
        setUserEmail(formData.email)
        setIsSubmitted(true)
      })
      .catch((error) => {
        handleOpenAlert({ severity: Severity.DESTRUCTIVE, data: error.message })
      })
      .finally(() => handleStopLoading())
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{isSubmitted ? "Sprawdź skrzynkę email" : "Przypominanie hasła"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {alert.isOpen && !isSubmitted ? (
              <AuthAlert
                variant={alert.severity}
                description={alert.message}
              />
            ) : null}
            {isSubmitted ? (
              <p className="text-sm">
                Wysłaliśmy link resetujący hasło na adres email <span className="font-medium">{userEmail}</span>.
                Wiadomość może przyjść w ciągu paru minut. Sprawdź folder spam
              </p>
            ) : (
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
                    <FormDescription>
                      Wprowadź adres e-mail, na który chcesz otrzymać informacje dotyczace restowania hasła.
                    </FormDescription>
                  </FormItem>
                )}
              />
            )}

            {isSubmitted ? (
              <div>
                <Link href={Routes.LOGIN}>
                  <Button className="w-full">Powrót do logowania</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Wysyłanie
                    </>
                  ) : (
                    "Wyślij"
                  )}
                </Button>
                <p className="text-sm text-center">
                  Wróc do strony{" "}
                  <Link
                    href={Routes.LOGIN}
                    className="font-semibold text-primary"
                  >
                    logowania
                  </Link>
                </p>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
