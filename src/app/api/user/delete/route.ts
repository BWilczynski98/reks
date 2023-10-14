import prisma from "@/lib/prisma"
import { NextResponse, type NextRequest } from "next/server"

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id")

  if (!id) {
    return new NextResponse("No required id argument", { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { id: id ? id : "" },
    select: { id: true, tokenToActivate: true, tokenToResetPassword: true },
  })

  if (!user) {
    return new NextResponse("No record with the specified ID was found in the database.", { status: 404 })
  }

  if (user.tokenToActivate) {
    await prisma.activeToken.delete({
      where: {
        userId: user.id,
      },
    })
  }

  if (user.tokenToResetPassword) {
    await prisma.resetPasswordToken.deleteMany({
      where: {
        userId: user.id,
      },
    })
  }

  await prisma.user.delete({
    where: {
      id: user.id,
    },
  })

  return NextResponse.json(id)
}
