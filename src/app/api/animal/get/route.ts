import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  const res = await prisma.animal.findMany()
  return NextResponse.json(res)
}
