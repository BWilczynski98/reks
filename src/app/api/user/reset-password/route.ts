import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import bcrypt from "bcrypt"
import { RequestErrors } from "@/types/errors-dictionary"
import prisma from "@/lib/prisma"

const dayjs = require("dayjs")

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { tokenToResetPassword: incomingTokenFromEmail, password } = body
  const newPassword = await bcrypt.hash(password, 10)

  if (!incomingTokenFromEmail) {
    return new NextResponse("Invalid incoming token from email", { status: 400 })
  }

  const token = await prisma.resetPasswordToken.findMany({
    where: {
      token: incomingTokenFromEmail,
    },
  })

  const tokenIsOutdated = dayjs().isAfter(token[0].expirationDate)
  const tokenIsUsed = token[0].used
  const userId = token[0].userId

  if (tokenIsOutdated) {
    return NextResponse.json({ message: RequestErrors.OUTDATED_TOKEN, success: false })
  }

  if (tokenIsUsed) {
    return NextResponse.json({ message: RequestErrors.IS_USED_TOKEN, success: false })
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: newPassword,
    },
  })

  await prisma.resetPasswordToken.updateMany({
    where: {
      userId,
      token: incomingTokenFromEmail,
    },
    data: {
      used: true,
    },
  })

  return NextResponse.json("Password reset was successful", { status: 200 })
}
