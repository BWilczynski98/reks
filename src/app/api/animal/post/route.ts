import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"
import { Residence } from "@prisma/client"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const {
    name,
    type,
    gender,
    birthDate,
    locationWhereFound,
    timeWhenFound,
    residence,
    photoUrl,
    userId,
    description,
    descriptionOfHealth,
    temporaryHomeFirstName,
    temporaryHomeLastName,
    temporaryHomePhoneNumber,
    temporaryHomeStreet,
    temporaryHomeBuildingNumber,
    temporaryHomeApartmentNumber,
    temporaryHomeCity,
    temporaryHomePostalCode,
  } = body
  console.log(body)
  if (!name || !type || !gender || !birthDate || !locationWhereFound || !timeWhenFound || !residence || !userId) {
    return new NextResponse("Missing fields", { status: 400 })
  }

  let home
  if (residence === Residence.TEMPORARY_HOME) {
    if (
      !temporaryHomeFirstName ||
      !temporaryHomeLastName ||
      !temporaryHomePhoneNumber ||
      !temporaryHomeStreet ||
      !temporaryHomeBuildingNumber ||
      !temporaryHomeCity ||
      !temporaryHomePostalCode
    ) {
      return new NextResponse("Missing fields", { status: 400 })
    }

    const address = temporaryHomeApartmentNumber
      ? `${temporaryHomeStreet.toUpperCase()} ${temporaryHomeBuildingNumber
          .trim()
          .toUpperCase()}/${temporaryHomeApartmentNumber.trim().toUpperCase()}`
      : `${temporaryHomeStreet.toUpperCase()} ${temporaryHomeBuildingNumber.trim().toUpperCase()}`

    const temporaryHomeInformation = {
      owner: `${temporaryHomeFirstName.trim().toUpperCase()} ${temporaryHomeLastName.trim().toUpperCase()}`,
      street: address,
      phoneNumber: temporaryHomePhoneNumber.trim(),
      city: temporaryHomeCity.toUpperCase(),
      postalCode: temporaryHomePostalCode.trim(),
    }

    home = await prisma.home.findFirst({
      where: {
        ...temporaryHomeInformation,
      },
      select: {
        id: true,
      },
    })

    if (!home) {
      home = await prisma.home.create({
        data: {
          ...temporaryHomeInformation,
        },
      })
    }
  }

  const animal = await prisma.animal.create({
    data: {
      photoUrl,
      name,
      type,
      gender,
      birthDate,
      locationWhereFound,
      timeWhenFound,
      residence,
      description,
      descriptionOfHealth,
      userId: userId,
      homeId: home ? home?.id : null,
    },
  })
  await prisma.healthCard.create({ data: { animalId: animal.id } })

  return NextResponse.json("Adding the animal has been successful", { status: 201 })
}
