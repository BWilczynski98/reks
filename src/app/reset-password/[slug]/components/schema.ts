import { Errors } from "@/types/errors-dictionary"
import * as yup from "yup"

export const userResetPasswordFormSchema = yup.object({
  password: yup
    .string()
    .required(Errors.EMPTY_FIELD)
    .min(6, Errors.MIN_LENGTH_PASSWORD)
    .matches(/^(?!.*[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ])[a-zA-Z0-9!@#$%^&*()-_=+]+$/, Errors.INCORRECT_REGEX_PASSWORD),
  confirmPassword: yup
    .string()
    .required(Errors.EMPTY_FIELD)
    .oneOf([yup.ref("password"), ""], Errors.INCORRECT_CONFIRM_PASSWORD),
})
