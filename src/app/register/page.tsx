"use client"
import { useCreateUserMutation } from "@/redux/services/userApi"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/navigation"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import * as yup from "yup"
import { Alert, Button, Logo, Navigator, PageTitle, TextField, Banner } from "../components/UI"
import { useAlert, useDisclose, useToggle } from "../hooks"
import { Severity } from "../types/alert"
import { ButtonType } from "../types/button"
import { Errors } from "../types/errorsDictionary"
import { Routes } from "../types/routes"
import { TextFieldType } from "../types/textfield"

const schema = yup
  .object({
    email: yup
      .string()
      .lowercase(Errors.LOWERCASE_EMAIL)
      .strict()
      .email(Errors.INCORRECT_EMAIL)
      .required(Errors.EMPTY_FIELD),
    password: yup
      .string()
      .required(Errors.EMPTY_FIELD)
      .min(6, Errors.MIN_LENGTH_PASSWORD)
      .matches(/^(?!.*[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ])[a-zA-Z0-9!@#$%^&*()-_=+]+$/, Errors.INCORRECT_REGEX_PASSWORD),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), ""], Errors.INCORRECT_CONFIRM_PASSWORD)
      .required(Errors.EMPTY_FIELD),
  })
  .required()
type FormData = yup.InferType<typeof schema>

export default function RegisterPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })
  const router = useRouter()
  const { toggle: passwordVisibility, handleToggle: handleTogglePasswordVisbility } = useToggle()
  const { alert, handleOpen: handleOpenAlert, handleClose: handleCloseAlert } = useAlert()
  const [createUser] = useCreateUserMutation()
  const { state: isLoading, handleOpen: startLoading, handleClose: stopLoading } = useDisclose()

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    startLoading()
    createUser({ email: data.email.toLowerCase(), password: data.password })
      .unwrap()
      .then((res) => {
        console.log(res)
        router.push(Routes.LOGIN)
        resetField("email")
        resetField("password")
        resetField("confirmPassword")
      })
      .catch((error) => {
        console.log(error)
        handleOpenAlert({ severity: Severity.ERROR, data: error.data })
      })
      .finally(() => stopLoading())
  }

  return (
    <main className="flex">
      <div className="hidden w-1/2 h-screen xl:block">
        <Banner />
      </div>
      <div className="relative flex flex-col items-center justify-center w-full h-screen bg-background xl:w-1/2 ">
        <div className="absolute top-6 left-6 sm:left-14 sm:top-14 xl:left-20 xl:top-20">
          <Logo />
        </div>
        <div className="w-[80vh] max-[320px]:max-w-[254px] max-[360px]:max-w-[324px] max-w-[354px] sm:max-w-[400px]">
          <div className="flex flex-col gap-2 py-5">
            <PageTitle>Zarejestruj się</PageTitle>
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
                  name="email"
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
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  placeholder={passwordVisibility ? "haslo" : "•••••"}
                  label="Powtórz hasło"
                  type={passwordVisibility ? TextFieldType.TEXT : TextFieldType.PASSWORD}
                  name="confirmPassword"
                  id="confirmPassword"
                  onChange={onChange}
                  value={value}
                  handleTogglePasswordVisbility={handleTogglePasswordVisbility}
                  error={!!errors.confirmPassword}
                  errorMessage={errors.confirmPassword?.message}
                />
              )}
            />
            <div className="pt-5">
              <Button
                type={ButtonType.SUBMIT}
                loading={isLoading}
              >
                Zarejestruj konto
              </Button>
            </div>
          </form>
          <div className="pt-5">
            <Navigator
              description={"Masz konto?"}
              span={"Zaloguj się"}
              onClick={() => router.push(Routes.LOGIN)}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
