import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { prisma } from "@lib/prisma"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, type, gender, birthDate, locationWhereFound, timeWhenFound, residence, status, userEmail, userId } =
    body

  if (
    !name ||
    !type ||
    !gender ||
    !birthDate ||
    !locationWhereFound ||
    !timeWhenFound ||
    !residence ||
    !status ||
    !userId
  ) {
    return new NextResponse("Missing fields", { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  const pr = await prisma.animal.create({
    data: {
      name,
      type,
      gender,
      birthDate,
      locationWhereFound,
      timeWhenFound,
      residence,
      status,
      user: { connect: { id: userId } },
    },
  })

  console.log(pr)

  return NextResponse.json("Adding the animal has been successful", { status: 201 })
}
