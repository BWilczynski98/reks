"use client"
import { useCreateUserMutation } from "@/redux/services/userApi"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import * as yup from "yup"
import { Banner } from "../assets/svg/banner"
import { Button } from "../components/UI/Button"
import { Logo } from "../components/UI/Logo/Logo"
import { Navigator } from "../components/UI/Navigator"
import { PageTitle } from "../components/UI/PageTitle"
import { TextField } from "../components/UI/TextField"

const schema = yup
  .object({
    email: yup.string().email("Podany adres email jest nie poprawny").required("To pole nie może być puste"),
    password: yup.string().required("To pole nie może być puste"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), ""], "Hasła muszą być takie same")
      .required("To pole nie może być puste"),
  })
  .required()
type FormData = yup.InferType<typeof schema>

export default function RegisterPage() {
  useEffect(() => {
    return () => {
      screen.orientation.lock("portrait")
    }
  }, [])

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false)
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState<boolean>(false)
  const [createUser] = useCreateUserMutation()

  const handleTogglePasswordVisbility = () => {
    setPasswordVisibility((prev) => !prev)
  }

  const handleToggleConfirmPasswordVisbility = () => {
    setConfirmPasswordVisibility((prev) => !prev)
  }

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    createUser({ email: data.email, password: data.password })
      .unwrap()
      .then((res) => {
        console.log(res)
      })
      .then((error) => {
        console.log(error)
      })
  }

  return (
    <main className="flex">
      <div className="hidden w-1/2 h-screen border md:block">
        <Banner />
      </div>
      <div className="relative flex flex-col items-center justify-center w-full h-screen bg-background md:w-1/2">
        <div className="absolute top-[25px] left-[25px]">
          <Logo />
        </div>
        <div>
          <div className="py-5">
            <PageTitle>Zarejestruj się</PageTitle>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-[80vh] max-w-[254px] gap-1"
          >
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  placeholder={"nazwa@email.com"}
                  label="Adres email"
                  type="email"
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
                  placeholder={"********"}
                  label="Hasło"
                  type={passwordVisibility ? "text" : "password"}
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
                  placeholder={"********"}
                  label="Powtórz hasło"
                  type={confirmPasswordVisibility ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  onChange={onChange}
                  value={value}
                  icon={confirmPasswordVisibility ? <AiFillEye /> : <AiFillEyeInvisible />}
                  handleTogglePasswordVisbility={handleToggleConfirmPasswordVisbility}
                  error={!!errors.confirmPassword}
                  errorMessage={errors.confirmPassword?.message}
                />
              )}
            />
            <div className="pt-5">
              <Button type="submit">Zarejestruj konto</Button>
            </div>
          </form>
          <div className="pt-5">
            <Navigator
              description={"Masz konto?"}
              span={"Zaloguj się"}
              onClick={() => console.log("span click")}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
