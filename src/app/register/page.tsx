"use client"
import { useCreateUserMutation } from "@/redux/services/userApi"
import { useState } from "react"
import { Banner } from "../assets/svg/banner"
import { TextField } from "../components/UI/TextField"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { Button } from "../components/UI/Button"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup
  .object({
    email: yup.string().email("Podany adres email jest nie poprawny").required("To pole nie może być puste"),
    password: yup.string().required("To pole nie może być puste"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "Hasła muszą być takie same") 
      .required("To pole nie może być puste"),
  })
  .required()
type FormData = yup.InferType<typeof schema>

export default function RegisterPage() {
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
      <div className="w-1/2 h-screen border">
        <Banner />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 p-2"
      >
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
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

        {/* <div>
          <TextField
            placeholder="email@email.com"
            label="Adres email"
            type="email"
            name="email"
            id="email"
            onChange={handleUserEmail}
            value={userNewAccountData.email}
          />
        </div>
        <div>
          <TextField
            placeholder="hasło"
            label="Hasło"
            type={passwordVisibility ? "text" : "password"}
            name="password"
            id="password"
            onChange={handleUserPassword}
            value={userNewAccountData.password}
            icon={passwordVisibility ? <AiFillEye /> : <AiFillEyeInvisible />}
            handleTogglePasswordVisbility={handleTogglePasswordVisbility}
          />
        </div>
        <div>
          <TextField
            placeholder="hasło"
            label="Powtórz hasło"
            type={confirmPasswordVisibility ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            onChange={handleConfirmUserPassword}
            value={userNewAccountData.confirmPassword}
            icon={confirmPasswordVisibility ? <AiFillEye /> : <AiFillEyeInvisible />}
            handleTogglePasswordVisbility={handleToggleConfirmPasswordVisbility}
          />
        </div> */}
        <div>
          <Button type="submit">Zarejestruj konto</Button>
        </div>
      </form>
    </main>
  )
}
