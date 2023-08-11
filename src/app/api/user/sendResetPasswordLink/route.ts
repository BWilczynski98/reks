import { prisma } from "@lib/prisma"
import { RequestErrors } from "@/app/types/errorsDictionary"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { resend } from "@/app/lib/resend"
import { EmailTemplate } from "@/app/components/UI/emails/EmailTemplate"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, tokenToResetPassword } = body

  if (!email) {
    return new NextResponse("Missing fields", { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    return new NextResponse(RequestErrors.NO_USER_FOUND, { status: 400 })
  }

  const token = await prisma.resetPasswordToken.create({
    data: { token: tokenToResetPassword, user: { connect: { id: user.id } } },
  })

  try {
    let firstNameCapitalize = ""
    user.name ? (firstNameCapitalize = user.name.charAt(0).toUpperCase() + user.name.slice(1)) : ""
    const description =
      "Na podany adres email została wysłana prośba zresetowania hasła. Jeśli chcesz zresetować hasło, kliknij poniższy przycisk i nadaj nowe hasło dla swojego konta."
    const notice =
      "Pamiętaj, ten mail jest ważny przez 24 godziny. Jeśli nie zresetowałeś/aś hasła w przeciągu 24 godzin od otrzymania tego maila, wygeneruj nową prośbę zresetowania hasła"
    const link = `reset-password/${tokenToResetPassword}`
    const buttonTitle = "Zresetuj hasło"
    const data = await resend.emails.send({
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
