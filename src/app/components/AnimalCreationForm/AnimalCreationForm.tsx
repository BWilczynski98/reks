"use client"
import { headline } from "@/app/lib/fonts"
import { formatPhoneNumber } from "@/app/lib/formatPhoneNumber"
import { formatPostalCode } from "@/app/lib/formatPostalCode"
import { regex } from "@/app/lib/regex"
import { AnimalGender, AnimalResidence, AnimalType } from "@/app/types/animal"
import { ButtonType } from "@/app/types/button"
import { Errors } from "@/app/types/errorsDictionary"
import { Routes } from "@/app/types/routes"
import { TextFieldType } from "@/app/types/textfield"
import { useCreateAnimalMutation } from "@/redux/services/animalApi"
import { Button, Calendar, Chapter, Dropzone, Label, TextField, Textarea } from "@components/UI"
import { Select } from "../UI/Select"
import { yupResolver } from "@hookform/resolvers/yup"
import { Gender, Residence, Type } from "@prisma/client"
import dayjs from "dayjs"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup"
// FIXME: In the yup validation scheme, the postal code of the location found and the postal code of the temporary house does not work correctly displaying a message about the inadequate number of characters
const schema = yup.object({
  name: yup.string().required(Errors.EMPTY_FIELD).matches(regex.names, Errors.INCORRECT_REGEX),
  type: yup.string().required(Errors.EMPTY_FIELD),
  gender: yup.string().required(Errors.EMPTY_FIELD),
  birthDate: yup.date().required(Errors.EMPTY_FIELD).typeError(Errors.INCORRECT_DATE),
  cityWhereFound: yup
    .string()
    .required(Errors.EMPTY_FIELD)
    .matches(regex.addressesWithoutNumber, Errors.INCORRECT_REGEX),
  streetWhereFound: yup.string().required(Errors.EMPTY_FIELD).matches(regex.addresses, Errors.INCORRECT_REGEX),
  postalCodeWhereFound: yup
    .string()
    .required(Errors.EMPTY_FIELD)
    // .min(5, Errors.MIN_LENGTH_POSTAL_CODE)
    // .max(5, Errors.MAX_LENGTH_POSTAL_CODE)
    .matches(regex.numbersWithDash, Errors.INCORRECT_REGEX),
  dateOfCaputer: yup.date().required(Errors.EMPTY_FIELD).typeError(Errors.INCORRECT_DATE),
  residence: yup.string().required(Errors.EMPTY_FIELD),
  firstNameTemporaryHome: yup.string().when("residence", {
    is: AnimalResidence.TEMPORARY_HOME,
    then: (schema) => schema.required(Errors.EMPTY_FIELD).matches(regex.names, Errors.INCORRECT_REGEX),
  }),
  lastNameTemporaryHome: yup.string().when("residence", {
    is: AnimalResidence.TEMPORARY_HOME,
    then: (schema) => schema.required(Errors.EMPTY_FIELD).matches(regex.names, Errors.INCORRECT_REGEX),
  }),
  phoneNumberTemporaryHome: yup.string().when("residence", {
    is: AnimalResidence.TEMPORARY_HOME,
    then: (schema) =>
      schema
        .required(Errors.EMPTY_FIELD)
        .min(9, Errors.MIN_LEGTH_PHONE_NUMBER)
        .max(9, Errors.MAX_LEGTH_PHONE_NUMBER)
        .matches(regex.numbersWithDash, Errors.INCORRECT_REGEX),
  }),
  streetTemporaryHome: yup.string().when("residence", {
    is: AnimalResidence.TEMPORARY_HOME,
    then: (schema) => schema.required(Errors.EMPTY_FIELD).matches(regex.addresses, Errors.INCORRECT_REGEX),
  }),
  buildingNumberTemporaryHome: yup.string().when("residence", {
    is: AnimalResidence.TEMPORARY_HOME,
    then: (schema) => schema.required(Errors.EMPTY_FIELD).matches(regex.objectNumber, Errors.INCORRECT_REGEX),
  }),
  apartmentNumberTemporaryHome: yup.string().when("residence", {
    is: AnimalResidence.TEMPORARY_HOME,
    then: (schema) => schema.matches(/^(?:[a-zA-Z0-9]+)?$/, Errors.INCORRECT_REGEX),
  }),
  cityTemporaryHome: yup.string().when("residence", {
    is: AnimalResidence.TEMPORARY_HOME,
    then: (schema) => schema.required(Errors.EMPTY_FIELD).matches(regex.addressesWithoutNumber, Errors.INCORRECT_REGEX),
  }),
  postalCodeTemporaryHome: yup.string().when("residence", {
    is: AnimalResidence.TEMPORARY_HOME,
    then: (schema) =>
      schema
        .required(Errors.EMPTY_FIELD)
        // .min(6, Errors.MIN_LENGTH_POSTAL_CODE)
        // .max(6, Errors.MAX_LENGTH_POSTAL_CODE)
        .matches(regex.numbersWithDash, Errors.INCORRECT_REGEX),
  }),

  healthDescription: yup.string(),
  notes: yup.string(),
})
type FormData = yup.InferType<typeof schema>

export const AnimalCreationForm = () => {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
    resetField,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      type: "",
      gender: "",
      birthDate: undefined,
      cityWhereFound: "",
      streetWhereFound: "",
      postalCodeWhereFound: "",
      dateOfCaputer: undefined,
      residence: "",
      firstNameTemporaryHome: "",
      lastNameTemporaryHome: "",
      phoneNumberTemporaryHome: "",
      streetTemporaryHome: "",
      buildingNumberTemporaryHome: "",
      apartmentNumberTemporaryHome: "",
      cityTemporaryHome: "",
      postalCodeTemporaryHome: "",
      healthDescription: "",
      notes: "",
    },
  })
  const [createAnimal] = useCreateAnimalMutation()
  const session = useSession()
  const userId = session.data?.user.id

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const birthDate = dayjs(data.birthDate).format()
    console.log(data)
    const animalData = {
      name: data.name,
      type: data.type === AnimalType.CAT ? Type.CAT : Type.DOG,
      gender: data.gender === AnimalGender.MALE ? Gender.MALE : Gender.FEMALE,
      birthDate: data.birthDate,
      locationWhereFound: `${data.cityWhereFound} ${data.postalCodeWhereFound} ${data.streetWhereFound}`,
      timeWhenFound: data.dateOfCaputer,
      photoUrl: "",
      residence: data.residence === AnimalResidence.BASE ? Residence.BASE : Residence.TEMPORARY_HOME,
      description: data.notes,
      descriptionOfHealth: data.healthDescription,
      temporaryHomeFirstName: data.firstNameTemporaryHome,
      temporaryHomeLastName: data.lastNameTemporaryHome,
      temporaryHomePhoneNumber: data.phoneNumberTemporaryHome,
      temporaryHomeStreet: data.streetTemporaryHome,
      temporaryHomeBuildingNumber: data.buildingNumberTemporaryHome,
      temporaryHomeApartmentNumber: data.apartmentNumberTemporaryHome,
      temporaryHomeCity: data.cityTemporaryHome,
      temporaryHomePostalCode: data.postalCodeTemporaryHome,
    }
    createAnimal({ ...animalData, userId })
      .unwrap()
      .then((res) => console.log(res))
      .catch((error) => console.log(error))
  }

  return (
    <>
      <div className={headline.className}>
        <h1 className="text-3xl font-bold">Informacje na temat zwierzęcia</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <Dropzone />
        <Chapter title="Informacje podstawowe">
          <div className="flex flex-col gap-4">
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
                  fullWidth
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
                  fullWidth
                />
              )}
            />
            <Controller
              name="birthDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Calendar
                  label="Data urodzenia"
                  name="birthDate"
                  id="birthDate"
                  onChange={onChange}
                  value={value}
                  error={!!errors.birthDate}
                  errorMessage={errors.birthDate?.message}
                />
              )}
            />
          </div>
        </Chapter>
        <Chapter title={"Lokalizacja"}>
          <div className="flex flex-col gap-4">
            <div>
              <Label
                name="locationWhereFound"
                error={!!errors.streetWhereFound || !!errors.cityWhereFound || !!errors.postalCodeWhereFound}
              >
                Miejsce złapania
              </Label>
            </div>
            <div className="flex flex-col justify-between gap-y-2">
              <div className="basis-full">
                <Controller
                  name="streetWhereFound"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      placeholder="Ulica"
                      type={TextFieldType.TEXT}
                      name="streetWhereFound"
                      id="streetWhereFound"
                      onChange={onChange}
                      value={value}
                      error={!!errors.streetWhereFound}
                      errorMessage={errors.streetWhereFound?.message}
                    />
                  )}
                />
              </div>
              <div className="flex gap-2">
                <div className="basis-1/2 max-sm:basis-full">
                  <Controller
                    name="cityWhereFound"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        placeholder="Miasto"
                        type={TextFieldType.TEXT}
                        name="cityWhereFound"
                        id="cityWhereFound"
                        onChange={onChange}
                        value={value}
                        error={!!errors.cityWhereFound}
                        errorMessage={errors.cityWhereFound?.message}
                      />
                    )}
                  />
                </div>
                <div className="basis-1/2 max-sm:basis-full">
                  <Controller
                    name="postalCodeWhereFound"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        placeholder="Kod pocztowy"
                        type={TextFieldType.TEXT}
                        name="postalCodeWhereFound"
                        id="postalCodeWhereFound"
                        onChange={onChange}
                        value={formatPostalCode(value as string)}
                        error={!!errors.postalCodeWhereFound}
                        errorMessage={errors.postalCodeWhereFound?.message}
                        maxLength={6}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <Controller
              name="dateOfCaputer"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Calendar
                  label="Data zabezpieczenia"
                  name="dateOfCaputer"
                  id="dateOfCaputer"
                  onChange={onChange}
                  value={value}
                  error={!!errors.dateOfCaputer}
                  errorMessage={errors.dateOfCaputer?.message}
                />
              )}
            />
            <Controller
              name="residence"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  label={"Gdzie przebywa"}
                  placeholder={"Miejsce zabezpieczenia"}
                  name="residence"
                  id="residence"
                  value={value}
                  options={[AnimalResidence.BASE, AnimalResidence.TEMPORARY_HOME]}
                  onChange={onChange}
                  error={!!errors.residence}
                  errorMessage={errors.residence?.message}
                  fullWidth
                />
              )}
            />
            {watch("residence") === AnimalResidence.TEMPORARY_HOME ? (
              <div className="p-2 bg-neutral-100/40 rounded-default">
                <div>
                  <Label
                    name="locationWhereFound"
                    error={!!errors.streetWhereFound || !!errors.cityWhereFound || !!errors.postalCodeWhereFound}
                  >
                    Dane domu tymczasowego
                  </Label>
                </div>
                <div className="flex flex-wrap justify-between gap-y-2">
                  <div className="flex gap-2 basis-full">
                    <div className="basis-full sm:basis-1/2">
                      <Controller
                        name="firstNameTemporaryHome"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <TextField
                            placeholder="Imię"
                            type={TextFieldType.TEXT}
                            name="firstNameTemporaryHome"
                            id="firstNameTemporaryHome"
                            onChange={onChange}
                            value={value}
                            error={!!errors.firstNameTemporaryHome}
                            errorMessage={errors.firstNameTemporaryHome?.message}
                          />
                        )}
                      />
                    </div>
                    <div className="basis-full sm:basis-1/2">
                      <Controller
                        name="lastNameTemporaryHome"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <TextField
                            placeholder="Nazwisko"
                            type={TextFieldType.TEXT}
                            name="surNameTemporaryHome"
                            id="surNameTemporaryHome"
                            onChange={onChange}
                            value={value}
                            error={!!errors.lastNameTemporaryHome}
                            errorMessage={errors.lastNameTemporaryHome?.message}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 basis-full">
                    <div className="basis-full sm:basis-1/2">
                      <Controller
                        name="phoneNumberTemporaryHome"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <TextField
                            placeholder="Numer telefonu"
                            type={TextFieldType.TEXT}
                            name="phoneNumberTemporaryHome"
                            id="phoneNumberTemporaryHome"
                            onChange={onChange}
                            value={formatPhoneNumber(value as string)}
                            error={!!errors.phoneNumberTemporaryHome}
                            errorMessage={errors.phoneNumberTemporaryHome?.message}
                            maxLength={9}
                          />
                        )}
                      />
                    </div>

                    <div className="basis-full sm:basis-1/2">
                      <Controller
                        name="streetTemporaryHome"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <TextField
                            placeholder="Ulica"
                            type={TextFieldType.TEXT}
                            name="streetTemporaryHome"
                            id="streetTemporaryHome"
                            onChange={onChange}
                            value={value}
                            error={!!errors.streetTemporaryHome}
                            errorMessage={errors.streetTemporaryHome?.message}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 basis-full">
                    <div className="basis-full sm:basis-1/2">
                      <Controller
                        name="buildingNumberTemporaryHome"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <TextField
                            placeholder="Budynek"
                            type={TextFieldType.TEXT}
                            name="buildingNumberTemporaryHome"
                            id="buildingNumberTemporaryHome"
                            onChange={onChange}
                            value={value}
                            error={!!errors.buildingNumberTemporaryHome}
                            errorMessage={errors.buildingNumberTemporaryHome?.message}
                          />
                        )}
                      />
                    </div>

                    <div className="basis-full sm:basis-1/2">
                      <Controller
                        name="apartmentNumberTemporaryHome"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <TextField
                            placeholder="Lokal"
                            type={TextFieldType.TEXT}
                            name="apartmentNumberTemporaryHome"
                            id="apartmentNumberTemporaryHome"
                            onChange={onChange}
                            value={value}
                            error={!!errors.apartmentNumberTemporaryHome}
                            errorMessage={errors.apartmentNumberTemporaryHome?.message}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 basis-full">
                    <div className="basis-full sm:basis-1/2">
                      <Controller
                        name="cityTemporaryHome"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <TextField
                            placeholder="Miasto"
                            type={TextFieldType.TEXT}
                            name="cityTemporaryHome"
                            id="cityTemporaryHome"
                            onChange={onChange}
                            value={value}
                            error={!!errors.cityTemporaryHome}
                            errorMessage={errors.cityTemporaryHome?.message}
                          />
                        )}
                      />
                    </div>

                    <div className="basis-full sm:basis-1/2">
                      <Controller
                        name="postalCodeTemporaryHome"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <TextField
                            placeholder="Kod pocztowy"
                            type={TextFieldType.TEXT}
                            name="postalCodeTemporaryHome"
                            id="postalCodeTemporaryHome"
                            onChange={onChange}
                            value={formatPostalCode(value as string)}
                            error={!!errors.postalCodeTemporaryHome}
                            errorMessage={errors.postalCodeTemporaryHome?.message}
                            maxLength={6}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </Chapter>
        <Chapter title="Zdrowie">
          <div>
            <Controller
              name="healthDescription"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Textarea
                  label="Stan zdrowia"
                  name="healthDescription"
                  id="healthDescription"
                  onChange={onChange}
                  value={value}
                  error={!!errors.healthDescription}
                  errorMessage={errors.healthDescription?.message}
                  rows={4}
                />
              )}
            />
          </div>
        </Chapter>
        <Chapter title="Dodatkowe informacje">
          <div>
            <Controller
              name="notes"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Textarea
                  label="Uwagi"
                  name="notes"
                  id="notes"
                  onChange={onChange}
                  value={value}
                  error={!!errors.notes}
                  errorMessage={errors.notes?.message}
                  rows={4}
                />
              )}
            />
          </div>
        </Chapter>

        <div className="flex justify-end gap-4 my-4">
          <Button
            type={ButtonType.RESET}
            outline
            action={"deny"}
            onClick={() => router.push(Routes.DASHBOARD)}
          >
            Anuluj
          </Button>

          <Button type={ButtonType.SUBMIT}>Dodaj</Button>
        </div>
      </form>
    </>
  )
}
