"use client"
import { useCreateUserMutation } from "@/redux/services/userApi"
import { Alert, Button, Modal, TextField } from "@components/UI"
import { yupResolver } from "@hookform/resolvers/yup"
import { useAlert, useDisclose } from "@hooks/index"
import { randomBytes } from "crypto"
import { useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup"
import { body, headline } from "@lib/fonts"
import { Severity } from "@/app/types/alert"
import { ButtonType } from "@/app/types/button"
import { Errors } from "@/app/types/errorsDictionary"
import { TextFieldType } from "@/app/types/textfield"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Card } from "../UI/Card/Card"

type UserAccountProps = {
  email: string
  name: string
}

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

export const UserCreationForm = () => {
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
  const { alert, handleOpen: handleOpenAlert, handleClose: handleCloseAlert } = useAlert()
  const { state: modalIsOpen, handleOpen: handleOpenModal, handleClose: handleCloseModal } = useDisclose()
  const [createUser] = useCreateUserMutation()
  const { state: isLoading, handleOpen: startLoading, handleClose: stopLoading } = useDisclose()
  const [userAccountData, setUserAccountData] = useState<UserAccountProps>({
    email: "",
    name: "",
  })

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const tokenToActivate = randomBytes(40).toString("hex")
    setUserAccountData({ ...data })
    handleOpenModal()
  }

  const sendRequest = async () => {
    handleCloseModal()
    startLoading()

    createUser({ ...userAccountData })
      .unwrap()
      .then((res) => {
        console.log(res)
        resetField("email")
        resetField("name")
        toast.success("Wiadomość wysłana", { position: toast.POSITION.BOTTOM_RIGHT })
      })
      .catch((error) => {
        console.log(error)
        handleOpenAlert({ severity: Severity.ERROR, data: error.data })
        toast.error("Coś poszło nie tak", { position: toast.POSITION.BOTTOM_LEFT })
      })
      .finally(() => stopLoading())
  }

  return (
    <Card>
      <Modal
        title="Rejestracja użytkownika"
        open={modalIsOpen}
        onClose={handleCloseModal}
        onConfirm={sendRequest}
      >
        <p>
          Wyślij na adres email&nbsp;
          <span className="font-semibold">{userAccountData.email}</span> link do aktywacji konta.
        </p>
      </Modal>
      <div className="w-full">
        <Alert
          open={alert.isOpen}
          severity={alert.severity}
          onClose={handleCloseAlert}
        >
          {alert.message}
        </Alert>
      </div>

      <section className="w-full">
        <div>
          <h3 className={`${headline.className} text-xl mb-2`}>Dodaj nowego użytkownika</h3>
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
              fullWidth
            >
              Dodaj
            </Button>
          </div>
        </form>
      </section>
      <ToastContainer autoClose={3000} />
    </Card>
  )
}
