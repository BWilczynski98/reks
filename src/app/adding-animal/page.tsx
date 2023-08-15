"use client"
import { useCreateAnimalMutation } from "@/redux/services/animalApi"
import { yupResolver } from "@hookform/resolvers/yup"
import { Gender, Residence, Status, Type } from "@prisma/client"
import { useSession } from "next-auth/react"
import { Controller, useForm } from "react-hook-form"
import * as yup from "yup"
import { headline } from "../lib/fonts"
import { Errors } from "../types/errorsDictionary"
import { Dropzone, TextField } from "../components/UI"
import { TextFieldType } from "../types/textfield"

const schema = yup.object({
  name: yup.string().required(Errors.EMPTY_FIELD),
  type: yup.string().required(Errors.EMPTY_FIELD),
  gender: yup.string().required(Errors.EMPTY_FIELD),
  birthDate: yup.date().required(Errors.EMPTY_FIELD),
  locationWhereFound: yup.string().required(Errors.EMPTY_FIELD),
  residence: yup.string().required(Errors.EMPTY_FIELD),
})
type FormData = yup.InferType<typeof schema>

export default function CreateAnimalFormPage() {
  const now = new Date()
  const session = useSession()
  const [createAnimal] = useCreateAnimalMutation()
  const {
    control,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      type: Type.CAT,
      gender: Gender.MALE,
      birthDate: now,
      locationWhereFound: "",
      residence: Residence.BASE,
    },
  })

  const animal = {
    name: "Kora",
    type: Type.DOG,
    gender: Gender.FEMALE,
    birthDate: "2023-08-12T12:40:03.642Z",
    locationWhereFound: "Malbork 82-200 ul.Grunwaldzka",
    timeWhenFound: "2023-08-12T12:40:03.642Z",
    residence: Residence.BASE,
    status: Status.UNADOPTABLE,
    userId: session.data?.user.id,
  }
  const handleAdd = async () => {
    createAnimal({ ...animal })
      .unwrap()
      .then((res) => console.log(res))
      .catch((error) => console.log(error))
  }
  return (
    <div className="flex justify-center w-full">
      <div className="px-4 py-2 bg-[#fff] w-1/2 flex flex-col gap-5">
        <div className={headline.className}>
          <h1 className="text-2xl font-medium">Informacje na temat zwierzęcia</h1>
        </div>
        <form>
          <Dropzone />
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                placeholder="Reks"
                label="Imię zwierzęcia"
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
        </form>
      </div>
    </div>
  )
}
