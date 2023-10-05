import { regex } from "@/lib/regex"
import { AnimalResidence, AnimalType } from "@/types/animal"
import { Errors } from "@/types/errorsDictionary"
import * as yup from "yup"

export const animalFormSchema = yup.object({
  photo: yup.string(),
  name: yup.string().required(Errors.EMPTY_FIELD).matches(regex.names, Errors.INCORRECT_REGEX),
  type: yup.string().required(Errors.EMPTY_FIELD),
  gender: yup.string().required(Errors.EMPTY_FIELD),
  race: yup.string().when("genre", {
    is: AnimalType.DOG,
    then: (schema) => schema.required(Errors.EMPTY_FIELD).matches(regex.names, Errors.INCORRECT_REGEX),
  }),
  size: yup.string().when("type", {
    is: AnimalType.DOG,
    then: (schema) => schema.required(Errors.EMPTY_FIELD),
  }),
  birthDate: yup.date().required(Errors.EMPTY_FIELD).typeError(Errors.INCORRECT_DATE),
  cityWhereFound: yup
    .string()
    .required(Errors.EMPTY_FIELD)
    .matches(regex.addressesWithoutNumber, Errors.INCORRECT_REGEX),
  streetWhereFound: yup.string().required(Errors.EMPTY_FIELD).matches(regex.addresses, Errors.INCORRECT_REGEX),
  postalCodeWhereFound: yup.string().length(5, Errors.POSTAL_CODE).matches(regex.postalCode).required(),
  dateOfSecurity: yup
    .date()
    .min(yup.ref("birthDate"), "Data zabezpieczenia nie może być przed datą urodzenia")
    .required(Errors.EMPTY_FIELD)
    .typeError(Errors.INCORRECT_DATE),
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
    then: (schema) => schema.required(Errors.EMPTY_FIELD).matches(regex.numbersWithDash, Errors.INCORRECT_REGEX),
  }),
  stateOfHealth: yup.string(),
})

export type AnimalFormData = yup.InferType<typeof animalFormSchema>
