import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(req: NextRequest) {
  const body = await req.json()
  const { id } = body

  await prisma.healthCard.delete({ where: { animalId: id } })
  await prisma.animal.delete({ where: { id } })

  return NextResponse.json(id)
}
