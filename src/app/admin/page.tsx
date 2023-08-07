"use client"
import { useCreateUserMutation, useForgotPassowrdMutation } from "@/redux/services/userApi"
import { Button, TextField } from "@components/UI"
import { yupResolver } from "@hookform/resolvers/yup"
import { useAlert, useDisclose, useToggle } from "@hooks/index"
import { randomBytes } from "crypto"
import { useRouter } from "next/navigation"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup"
import { headline } from "../lib/fonts"
import { Severity } from "../types/alert"
import { ButtonType } from "../types/button"
import { Errors } from "../types/errorsDictionary"
import { TextFieldType } from "../types/textfield"

const schema = yup
  .object({
    email: yup
      .string()
      .lowercase(Errors.LOWERCASE_EMAIL)
      .strict()
      .email(Errors.INCORRECT_EMAIL)
      .required(Errors.EMPTY_FIELD),
    name: yup.string().required(Errors.EMPTY_FIELD),
  })
  .required()
type FormData = yup.InferType<typeof schema>

export default function AdminPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      name: "",
    },
  })
  const router = useRouter()
  const { toggle: passwordVisibility, handleToggle: handleTogglePasswordVisbility } = useToggle()
  const { alert, handleOpen: handleOpenAlert, handleClose: handleCloseAlert } = useAlert()
  const [createUser] = useCreateUserMutation()
  const [forgotPassword] = useForgotPassowrdMutation()
  const { state: isLoading, handleOpen: startLoading, handleClose: stopLoading } = useDisclose()

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const randomPassword = randomBytes(20).toString("hex")
    const tokenToActivate = randomBytes(40).toString("hex")
    console.log(randomPassword)
    startLoading()
    createUser({
      email: data.email.toLowerCase(),
      password: randomPassword,
      name: data.name.toLowerCase(),
      tokenToActivate,
    })
      .unwrap()
      .then((res) => {
        console.log(res)
        resetField("email")
        resetField("name")
      })
      .catch((error) => {
        console.log(error)
        handleOpenAlert({ severity: Severity.ERROR, data: error.data })
      })
      .finally(() => stopLoading())
  }

  return (
    <main className="flex p-2">
      <section>
        <div>
          <h3 className={`${headline.className} text-xl`}>Dodaj nowego użytkownika</h3>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-1 md:gap-2 w-96"
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
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                placeholder={"Jan"}
                label="Imię"
                type={TextFieldType.TEXT}
                name="name"
                id="name"
                onChange={onChange}
                value={value}
                error={!!errors.name}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <div className="pt-5">
            <Button
              type={ButtonType.SUBMIT}
              loading={isLoading}
            >
              Wyślij link aktywacyjny
            </Button>
          </div>
        </form>
      </section>
    </main>
  )
}
