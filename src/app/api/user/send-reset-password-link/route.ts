import { prisma } from "@lib/prisma"
import { RequestErrors } from "@/app/types/errorsDictionary"
import { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { resend } from "@/app/lib/resend"
import { EmailTemplate } from "@/app/components/UI/emails/EmailTemplate"
import { randomBytes } from "crypto"

const dayjs = require("dayjs")

type Props = {
  id: number
  userId: string
  createAt: string
  token: string
  updatedAt: string
  expirationDate: string
  used: boolean
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email } = body
  const token = randomBytes(40).toString("hex")

  // check if the email address has been forwarded
  if (!email) {
    return new NextResponse("Missing fields", { status: 400 })
  }
  // check if the token has been forwarded
  if (!token) {
    return new NextResponse("Missing token", { status: 400 })
  }
  // find user account based on email address
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  // check if there is an account
  if (!user) {
    return new NextResponse(RequestErrors.NO_USER_FOUND, { status: 400 })
  }
  // find all password reset tokens for this user based on user id
  const userPasswordResetTokens = await prisma.resetPasswordToken.findMany({
    where: { userId: user.id },
  })

  const hasValidAndNotUsedToken = userPasswordResetTokens.some((tokenToResetPassword) => {
    return dayjs().isBefore(tokenToResetPassword.expirationDate) && tokenToResetPassword.used === false
  })

  if (hasValidAndNotUsedToken) {
    return new NextResponse(RequestErrors.PASSWORD_RESET_REQUEST_EXIST, { status: 400 })
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
    return NextResponse.json("Send email", { status: 201 })
  } catch (error) {
    return NextResponse.json({ error })
  }
}
