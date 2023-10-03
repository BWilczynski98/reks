import { regex } from "@/lib/regex"
import { Errors } from "@/types/errorsDictionary"
import * as yup from "yup"

export const animalFormSchema = yup.object({
  photo: yup.string(),
  name: yup.string().required(Errors.EMPTY_FIELD).matches(regex.names, Errors.INCORRECT_REGEX),
  genre: yup.string().required(Errors.EMPTY_FIELD),
  gender: yup.string().required(Errors.EMPTY_FIELD),
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
  stateOfHealth: yup.string(),
})

export type AnimalFormData = yup.InferType<typeof animalFormSchema>
