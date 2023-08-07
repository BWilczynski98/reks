import prisma from "@/app/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { tokenToActivate, password } = body
  const token = tokenToActivate as string
  if (!tokenToActivate) {
    return new NextResponse("Invalid token", { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await prisma.user.findFirst({
    where: {
      tokenToActivate,
    },
  })
  const userUpdate = await prisma.user.update({
    where: {
      tokenToActivate: user?.tokenToActivate as string,
      email: user?.email,
      id: user?.id,
    },
    data: {
      active: true,
      password: hashedPassword,
      tokenToActivate: null,
    },
  })

  return NextResponse.json(userUpdate)
}
