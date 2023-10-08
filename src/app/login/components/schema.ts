import { regex } from "@/lib/regex"
import { Errors } from "@/types/errorsDictionary"
import * as yup from "yup"

export const userAuthFormSchema = yup.object({
  email: yup
    .string()
    .lowercase(Errors.LOWERCASE_EMAIL)
    .strict()
    .email(Errors.INCORRECT_EMAIL)
    .required(Errors.EMPTY_FIELD),
  password: yup
    .string()
    .required(Errors.EMPTY_FIELD)
    .matches(regex.withoutSpecialAndPolishLanguageCharacters, Errors.INCORRECT_REGEX_PASSWORD),
})
