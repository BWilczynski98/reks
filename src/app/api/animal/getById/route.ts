import prisma from "@/app/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const id = await req.nextUrl.searchParams.get("id")
  const pet = await prisma.animal.findUnique({
    where: {
      id: id ? id : "",
    },
  })
  return NextResponse.json(pet)
}
