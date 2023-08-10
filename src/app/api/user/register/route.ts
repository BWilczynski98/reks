import { WelcomeTemplate } from "@/app/components/UI/emails/WelcomeTemplate"
import { prisma } from "@/app/lib/prisma"
import { RequestErrors } from "@/app/types/errorsDictionary"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, name, tokenToActivate } = body

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
      tokenToActivate,
      name,
    },
  })

  try {
    const firstNameCapitalize = name.charAt(0).toUpperCase() + name.slice(1)
    const data = await resend.emails.send({
      from: "Reks <support@reks-manager.pl>",
      to: email,
      subject: "Aktywuj konto",
      react: WelcomeTemplate({ firstName: firstNameCapitalize, tokenToActivate }),
    })

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error })
  }
}
