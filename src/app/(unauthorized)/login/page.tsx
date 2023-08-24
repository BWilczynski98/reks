"use client"
import { Alert, Banner, Button, Logo, PageTitle, TextField } from "@/app/components/UI"
import { yupResolver } from "@hookform/resolvers/yup"
import { useAlert, useDisclose, useToggle } from "@hooks/index"
import { body } from "@lib/fonts"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useLayoutEffect } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import * as yup from "yup"
import { Severity } from "../../types/alert"
import { ButtonType } from "../../types/button"
import { Errors } from "../../types/errorsDictionary"
import { Routes } from "../../types/routes"
import { TextFieldType } from "../../types/textfield"
import { regex } from "../../lib/regex"

const schema = yup.object({
  email: yup
    .string()
    .lowercase(Errors.LOWERCASE_EMAIL)
    .strict()
    .email(Errors.INCORRECT_EMAIL)
    .required(Errors.EMPTY_FIELD),
  password: yup
    .string()
    .required(Errors.EMPTY_FIELD)
    .matches(regex.withoutSpecialAndPolishLanguageCharacters, Errors.INCORRECT_REGEX_PASSWORD),
})
type FormData = yup.InferType<typeof schema>

export default function LoginPage() {
  const router = useRouter()
  const session = useSession()
  const {
    control,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm({ resolver: yupResolver(schema), defaultValues: { email: "", password: "" } })
  const { alert, handleOpen: handleOpenAlert, handleClose: handleCloseAlert } = useAlert()
  const { toggle: passwordVisibility, handleToggle: handleTogglePasswordVisbility } = useToggle()
  const { state: isLoading, handleOpen: startLoading, handleClose: stopLoading } = useDisclose()

  useLayoutEffect(() => {
    if (session?.status === "authenticated") {
      router.push(Routes.DASHBOARD)
    }
  })

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    await startLoading()
    await signIn("credentials", { ...data, redirect: false }).then((callback) => {
      if (callback?.error) {
        console.log(callback?.error)
        handleOpenAlert({ severity: Severity.ERROR, data: callback?.error })
      }

      if (callback?.ok && !callback?.error) {
        router.push(Routes.DASHBOARD)
        handleCloseAlert()
        resetField("email")
        resetField("password")
      }
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
            <PageTitle>Zaloguj się</PageTitle>
            <Alert
              severity={alert.severity}
              open={alert.isOpen}
              onClose={handleCloseAlert}
            >
              {alert.message}
            </Alert>
          </div>
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
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  placeholder={passwordVisibility ? "haslo" : "•••••"}
                  label="Hasło"
                  type={passwordVisibility ? TextFieldType.TEXT : TextFieldType.PASSWORD}
                  name="password"
                  id="password"
                  onChange={onChange}
                  value={value}
                  icon={passwordVisibility ? <AiFillEye /> : <AiFillEyeInvisible />}
                  handleTogglePasswordVisbility={handleTogglePasswordVisbility}
                  error={!!errors.password}
                  errorMessage={errors.password?.message}
                />
              )}
            />
            <div>
              <p
                className={`${body.className} text-sm text-right cursor-pointer sm:text-base`}
                onClick={() => router.push(Routes.FORGOT_PASSWORD)}
              >
                Zapomniałeś/aś hasło?
              </p>
            </div>
            <div className="pt-5">
              <Button
                type={ButtonType.SUBMIT}
                loading={isLoading}
              >
                Zaloguj się
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
