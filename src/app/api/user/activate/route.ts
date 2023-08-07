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
  const user = await prisma.user.update({
    where: {
      tokenToActivate: token,
    },
    data: {
      active: true,
      password: hashedPassword,
      tokenToActivate: null,
    },
  })

  return NextResponse.json(user)
}
