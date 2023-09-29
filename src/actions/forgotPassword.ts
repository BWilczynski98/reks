"use server"

import { UserForgotPasswordFormData } from "@/app/forgot-password/components/schema"
import prisma from "@/lib/prisma"
import { RequestErrors } from "@/types/errorsDictionary"
import { randomBytes } from "crypto"
const dayjs = require("dayjs")
import { resend } from "@/lib/resend"
import { EmailTemplate } from "@/components"

export async function forgotPassword(formData: UserForgotPasswordFormData) {
  const { email } = formData
  const token = randomBytes(40).toString("hex")

  // check if the email address has been forwarded
  if (!email) {
    throw Error("Missing fields")
  }
  // check if the token has been forwarded
  if (!token) {
    throw Error("Missing token")
  }
  // find user account based on email address
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  // check if there is an account
  if (!user) {
    throw Error(RequestErrors.NO_USER_FOUND)
  }
  // find all password reset tokens for this user based on user id
  const userPasswordResetTokens = await prisma.resetPasswordToken.findMany({
    where: { userId: user.id },
  })

  const hasValidAndNotUsedToken = userPasswordResetTokens.some((tokenToResetPassword) => {
    return dayjs().isBefore(tokenToResetPassword.expirationDate) && tokenToResetPassword.used === false
  })

  if (hasValidAndNotUsedToken) {
    throw Error(RequestErrors.PASSWORD_RESET_REQUEST_EXIST)
  }

  await prisma.resetPasswordToken.create({
    data: { token, user: { connect: { id: user.id } } },
  })

  try {
    const firstNameCapitalize = user.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : ""
    const description =
      "Na podany adres email została wysłana prośba zresetowania hasła. Jeśli chcesz zresetować hasło, kliknij poniższy przycisk i nadaj nowe hasło dla swojego konta."
    const notice =
      "Pamiętaj, ten mail jest ważny przez 24 godziny. Jeśli nie zresetowałeś/aś hasła w przeciągu 24 godzin od otrzymania tego maila, wygeneruj nową prośbę zresetowania hasła"
    const link = `reset-password/${token}`
    const buttonTitle = "Zresetuj hasło"
    await resend.emails.send({
      from: "Reks <support@reks-manager.pl>",
      to: email,
      subject: "Resetowanie hasła",
      react: EmailTemplate({ firstName: firstNameCapitalize, description, notice, link, buttonTitle }),
    })
    return { message: "Send email" }
  } catch (error) {
    return { message: error }
  }
}
