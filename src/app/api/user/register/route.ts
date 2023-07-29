import bcrypt from "bcrypt"
import { prisma } from "@/app/lib/prisma"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, password } = body
  console.log(body)

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
    return new NextResponse("This email address is already exist", { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  })

  return NextResponse.json(user)
}
