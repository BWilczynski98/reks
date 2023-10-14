import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server"

const dayjs = require("dayjs")

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { tokenToActivate, name, password } = body
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

  if (!user) {
    return new NextResponse("Token is used", { status: 400 })
  }

  const userToken = await prisma.activeToken.findUnique({
    where: {
      userId: user?.id,
    },
  })

  const now = dayjs()
  const userTokenCreateDate = dayjs(userToken?.createAt)
  const timeDifference = now.diff(userTokenCreateDate)

  if (timeDifference >= 1000 * 60 * 60 * 24) {
    return new NextResponse("Token is expired", { status: 400 })
  }

  // check user active
  // flag isUsed

  await prisma.user.update({
    where: {
      email: user?.email,
      id: user?.id,
    },
    data: {
      name,
      active: true,
      password: hashedPassword,
    },
  })

  // update isUsed = true

  await prisma.activeToken.delete({
    where: {
      userId: user?.id,
    },
  })

  return NextResponse.json("Activation successful", { status: 200 })
}
