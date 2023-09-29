import prisma from "@/app/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id")

  if (!id) {
    return new NextResponse("Missing id params", { status: 400 })
  }

  const healthCard = await prisma.healthCard.findUnique({
    where: {
      animalId: id,
    },
  })

  if (!healthCard) {
    return new NextResponse("No health card", { status: 400 })
  }

  return NextResponse.json(healthCard)
}
