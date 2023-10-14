import { Errors } from "@/types/errors-dictionary"
import * as yup from "yup"

export const userForgotPasswordFormSchema = yup.object({
  email: yup
    .string()
    .lowercase(Errors.LOWERCASE_EMAIL)
    .strict()
    .email(Errors.INCORRECT_EMAIL)
    .required(Errors.EMPTY_FIELD),
})

export type UserForgotPasswordFormData = yup.InferType<typeof userForgotPasswordFormSchema>
