"use client"
import { headline } from "@/app/lib/fonts"
import { AnimalGender, AnimalType } from "@/app/types/animal"
import { ButtonType } from "@/app/types/button"
import { Errors } from "@/app/types/errorsDictionary"
import { TextFieldType } from "@/app/types/textfield"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup"
import { Button, Calendar, Dropzone, Select, TextField } from "../UI"

const schema = yup.object({
  name: yup.string().required(Errors.EMPTY_FIELD),
  type: yup.string().required(Errors.EMPTY_FIELD),
  gender: yup.string().required(Errors.EMPTY_FIELD),
  birthDate: yup.date().required(Errors.EMPTY_FIELD),
  // locationWhereFound: yup.string().required(Errors.EMPTY_FIELD),
  // residence: yup.string().required(Errors.EMPTY_FIELD),
})
type FormData = yup.InferType<typeof schema>

export const AnimalCreationForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      type: "",
      gender: "",
      birthDate: undefined,
      // locationWhereFound: "",
      // residence: Residence.BASE,
    },
  })

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    console.log(data)
  }

  return (
    <>
      <div className={headline.className}>
        <h1 className="text-2xl font-medium">Informacje na temat zwierzęcia</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <Dropzone />
        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              placeholder="Reks"
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
        <Controller
          name="type"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              label={"Typ"}
              placeholder={"Wybierz typ zwierzęcia"}
              name="type"
              id="type"
              value={value}
              options={[AnimalType.DOG, AnimalType.CAT]}
              onChange={onChange}
              error={!!errors.type}
              errorMessage={errors.type?.message}
            />
          )}
        />
        <Controller
          name="gender"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              label={"Płeć"}
              placeholder={"Wybierz płeć zwierzęcia"}
              name="gender"
              id="gender"
              value={value}
              options={[AnimalGender.MALE, AnimalGender.FEMALE]}
              onChange={onChange}
              error={!!errors.gender}
              errorMessage={errors.gender?.message}
            />
          )}
        />
        <Controller
          name="birthDate"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Calendar
              label="Data urodzenia"
              onChange={onChange}
              value={value}
              error={!!errors.birthDate}
              errorMessage={errors.birthDate?.message}
            />
          )}
        />
        <div className="flex justify-end gap-4">
          <div className="w-36">
            <Button
              type={ButtonType.RESET}
              outline
            >
              Anuluj
            </Button>
          </div>
          <div className="w-36">
            <Button type={ButtonType.SUBMIT}>Dodaj</Button>
          </div>
        </div>
      </form>
    </>
  )
}
