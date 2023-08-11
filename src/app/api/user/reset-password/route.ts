import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { prisma } from "@lib/prisma"
import bcrypt from "bcrypt"

const dayjs = require("dayjs")

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { tokenToResetPassword, password } = body
  const newPassword = await bcrypt.hash(password, 10)
  if (!tokenToResetPassword) {
    return new NextResponse("Invalid token", { status: 400 })
  }

  const user = await prisma.user.findFirst({
    where: {
      tokenToResetPassword: {
        token: tokenToResetPassword,
      },
    },
  })

  const userToken = await prisma.resetPasswordToken.findUnique({
    where: {
      userId: user?.id,
    },
  })

  const now = dayjs()
  const userTokenCreateDate = dayjs(userToken?.createAt)
  const timeDifference = now.diff(userTokenCreateDate)

  if (timeDifference >= 86400000) {
    return new NextResponse("Token is expired", { status: 400 })
  }

  await prisma.user.update({
    where: {
      email: user?.email,
      id: user?.id,
    },
    data: {
      password: newPassword,
    },
  })

  await prisma.resetPasswordToken.delete({
    where: {
      userId: user?.id,
    },
  })

  return NextResponse.json("Password reset was successful", { status: 200 })
}
