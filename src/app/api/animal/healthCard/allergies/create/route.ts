import prisma from "@/app/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { animalId, allergyId, category, allergen, symptoms } = await body

  if (!animalId || !category || !allergen || !symptoms) {
    return new NextResponse("Missing fields", { status: 400 })
  }

  await prisma.healthCard.update({
    where: { animalId },
    data: { allergies: { push: { allergyId, category, allergen, symptoms } } },
  })

  return NextResponse.json("Allergies added to health record", { status: 201 })
}
