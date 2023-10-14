import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const id = await req.nextUrl.searchParams.get("id")
  const pet = await prisma.animal.findUnique({
    where: {
      id: id ? id : "",
    },
  })

  if (!pet) {
    return new NextResponse("Page not found", { status: 404 })
  }
  return NextResponse.json(pet)
}
