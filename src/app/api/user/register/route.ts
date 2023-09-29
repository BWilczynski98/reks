import { EmailTemplate } from "@/components"
import prisma from "@/lib/prisma"
import { RequestErrors } from "@/types/errorsDictionary"
import { randomBytes } from "crypto"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, name } = body
  const token = randomBytes(40).toString("hex")
  // body empty input validation
  if (!email) {
    return new NextResponse("Missing fields", { status: 400 })
  }

  // I check if the account with the given email address exists
  const exist = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (exist) {
    return new NextResponse(RequestErrors.EMAIL_EXIST, { status: 400 })
  }

  const user = await prisma.user.create({
    data: {
      email,
      password: "",
      name,
    },
  })

  await prisma.activeToken.create({
    data: { token, user: { connect: { id: user.id } } },
  })

  try {
    const firstNameCapitalize = name.charAt(0).toUpperCase() + name.slice(1)
    const description =
      "Na podany adres email zostało założone konto w aplikacji reks-manager. Aby dokończyć proces rejestracji przejdz na strone aktywacji naciskając przycisk i nadaj hasło."
    const notice =
      "Pamiętaj, ten mail jest ważny przez 24 godziny, po upływie tego czasu możliwość aktywacji konta zostanie zablokowana. Jeśli czas minął, skontaktuj się z administratorem"
    const link = `activate/${token}`
    const buttonTitle = "Aktywuj konto"
    const data = await resend.emails.send({
      from: "Reks <support@reks-manager.pl>",
      to: email,
      subject: "Aktywuj konto",
      react: EmailTemplate({ firstName: firstNameCapitalize, description, notice, link, buttonTitle }),
    })

    return NextResponse.json("Registration successful", { status: 201 })
  } catch (error) {
    return NextResponse.json({ error })
  }
}
