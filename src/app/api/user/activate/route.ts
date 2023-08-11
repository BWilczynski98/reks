import prisma from "@/app/lib/prisma"
import bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server"

const dayjs = require("dayjs")

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { tokenToActivate, password } = body
  const hashedPassword = await bcrypt.hash(password, 10)

  if (!tokenToActivate) {
    return new NextResponse("Invalid token", { status: 400 })
  }

  const user = await prisma.user.findFirst({
    where: {
      tokenToActivate: {
        token: tokenToActivate,
      },
    },
  })

  const userToken = await prisma.activeToken.findUnique({
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
      active: true,
      password: hashedPassword,
    },
  })

  await prisma.activeToken.delete({
    where: {
      userId: user?.id,
    },
  })

  return NextResponse.json("Activation successful", { status: 200 })
}
