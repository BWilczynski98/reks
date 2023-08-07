import { WelcomeTemplate } from "@/app/components/UI/emails/WelcomeTemplate"
import { prisma } from "@/app/lib/prisma"
import { RequestErrors } from "@/app/types/errorsDictionary"
import bcrypt from "bcrypt"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, password, name, tokenToActivate } = body

  // body empty input validation
  if (!email || !password) {
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

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      tokenToActivate,
    },
  })

  try {
    const data = await resend.emails.send({
      from: "Reks <support@reks-manager.pl>",
      to: email,
      subject: "Aktywuj konto",
      react: WelcomeTemplate({ firstName: name, password, tokenToActivate }),
    })

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error })
  }
}
