import prisma from "@/app/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { tokenToActivate, password } = body

  if (!tokenToActivate) {
    return new NextResponse("Invalid token", { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await prisma.user.update({
    where: {
      tokenToActivate,
    },
    data: {
      active: true,
      password: hashedPassword,
      tokenToActivate: null,
    },
  })

  return NextResponse.json(user)
}
