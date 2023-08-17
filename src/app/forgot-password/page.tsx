"use client"
import { useSendResetPasswordLinkMutation } from "@/redux/services/userApi"
import { Alert, Banner, Button, Logo, Navigator, PageTitle, TextField } from "@components/UI"
import { yupResolver } from "@hookform/resolvers/yup"
import { useAlert, useDisclose } from "@hooks/index"
import { body } from "@lib/fonts"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup"
import { cn } from "../lib/cn"
import { Severity } from "../types/alert"
import { ButtonType } from "../types/button"
import { Errors } from "../types/errorsDictionary"
import { Routes } from "../types/routes"
import { TextFieldType } from "../types/textfield"

const schema = yup.object({
  email: yup
    .string()
    .lowercase(Errors.LOWERCASE_EMAIL)
    .strict()
    .email(Errors.INCORRECT_EMAIL)
    .required(Errors.EMPTY_FIELD),
})
type FormData = yup.InferType<typeof schema>

export default function ResetPasswordPage() {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm({ resolver: yupResolver(schema), defaultValues: { email: "" } })
  const { alert, handleOpen: handleOpenAlert, handleClose: handleCloseAlert } = useAlert()
  const { state: isLoading, handleOpen: startLoading, handleClose: stopLoading } = useDisclose()
  const [sendResetPasswordLink] = useSendResetPasswordLinkMutation()
  const [userEmail, setUserEmail] = useState<string>("wilczek3698@gmail.com")
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    startLoading()
    sendResetPasswordLink({ email: data.email })
      .unwrap()
      .then((res) => {
        console.log(res)
        setUserEmail(data.email)
        setIsSubmitted(true)
        resetField("email")
      })
      .catch((error) => {
        console.log(error)
        setIsSubmitted(false)
        handleOpenAlert({ severity: Severity.ERROR, data: error.data })
      })
      .finally(() => {
        stopLoading()
      })
  }

  return (
    <main className="flex">
      <div className="hidden w-1/2 h-screen xl:block">
        <Banner />
      </div>
      <div className="relative flex flex-col items-center justify-center w-full h-screen xl:w-1/2">
        <div className="absolute top-6 left-6 sm:left-14 sm:top-14 xl:left-20 xl:top-20">
          <Logo />
        </div>
        <div className="w-[80vh] max-[320px]:max-w-[254px] max-[360px]:max-w-[324px] max-w-[354px] sm:max-w-[400px]">
          <div className="flex flex-col gap-2 py-5">
            <PageTitle>{isSubmitted ? "Sprawdź skrzynkę email" : "Przypominanie hasła"}</PageTitle>
            {alert.isOpen ? (
              <Alert
                open={alert.isOpen}
                severity={alert.severity}
                onClose={handleCloseAlert}
              >
                {alert.message}
              </Alert>
            ) : (
              <p className={cn(`${body.className} text-sm sm:test-base text-center`, { "my-5": isSubmitted })}>
                {isSubmitted ? (
                  <span>
                    Wysłaliśmy link resetujący hasło na adres email <span className="font-medium">{userEmail}</span>.
                    Wiadomość może przyjść w ciągu paru minut. Sprawdź folder spam
                  </span>
                ) : (
                  "Wprowadź adres e-mail, na który chcesz otrzymać informacje dotyczace restowania hasła."
                )}
              </p>
            )}
          </div>
          {isSubmitted ? (
            <Button onClick={() => router.push(Routes.LOGIN)}>Powrót do logowania</Button>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-1 md:gap-2"
            >
              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    placeholder={"nazwa@email.com"}
                    label="Adres email"
                    type={TextFieldType.EMAIL}
                    name="Email"
                    id="email"
                    onChange={onChange}
                    value={value}
                    error={!!errors.email}
                    errorMessage={errors.email?.message}
                  />
                )}
              />
              <div className="pt-5">
                <Button
                  type={ButtonType.SUBMIT}
                  loading={isLoading}
                >
                  Wyślij
                </Button>
              </div>
            </form>
          )}

          <div className="pt-5">
            {isSubmitted ? null : (
              <Navigator
                description="Wróć do strony"
                span="logowania"
                onClick={() => router.push(Routes.LOGIN)}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
