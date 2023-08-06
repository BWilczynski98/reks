"use client"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/navigation"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup"
import { Alert, Banner, Button, Logo, Navigator, PageTitle, TextField } from "@components/UI"
import { useAlert, useDisclose } from "@hooks/index"
import { body } from "@lib/fonts"
import { ButtonType } from "../types/button"
import { Errors } from "../types/errorsDictionary"
import { Routes } from "../types/routes"
import { TextFieldType } from "../types/textfield"
import { useForgotPassowrdMutation } from "@/redux/services/userApi"

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
  const [forgotPassword] = useForgotPassowrdMutation()

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    startLoading()
    forgotPassword({ email: data.email })
      .unwrap()
      .then((res) => {
        console.log(res)
        resetField("email")
      })
      .catch((error) => {
        console.log(error)
      })

    stopLoading()
  }

  return (
    <main className="flex">
      <div className="hidden w-1/2 h-screen xl:block">
        <Banner />
      </div>
      <div className="relative flex flex-col items-center justify-center w-full h-screen bg-background xl:w-1/2">
        <div className="absolute top-6 left-6 sm:left-14 sm:top-14 xl:left-20 xl:top-20">
          <Logo />
        </div>
        <div className="w-[80vh] max-[320px]:max-w-[254px] max-[360px]:max-w-[324px] max-w-[354px] sm:max-w-[400px]">
          <div className="flex flex-col gap-2 py-5">
            <PageTitle>Przypominanie hasła</PageTitle>
            {alert.isOpen ? (
              <Alert
                open={alert.isOpen}
                severity={alert.severity}
                onClose={handleCloseAlert}
              >
                {alert.message}
              </Alert>
            ) : (
              <p className={`${body.className} text-sm sm:test-base text-center`}>
                Wprowadź adres e-mail, na który chcesz otrzymać informacje dotyczace restowania hasła.
              </p>
            )}
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
            <div className="pt-5">
              <Button
                type={ButtonType.SUBMIT}
                loading={isLoading}
              >
                Wyślij
              </Button>
            </div>
          </form>
          <div className="pt-5">
            <Navigator
              description="Wróć do strony"
              span="logowania"
              onClick={() => router.push(Routes.LOGIN)}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
