"use server"

import { baseUrl } from "@/app/api/baseUrl"
import { AnimalFormData } from "@/components/AnimalForm/schema"
import prisma from "@/lib/prisma"
import { AnimalGender, AnimalResidence, AnimalType } from "@/types/animal"
import { Routes } from "@/types/routes"
import { Gender, Residence, Type } from "@prisma/client"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

export async function addAnimal(formData: AnimalFormData, userId: string) {
  const {
    photo,
    name,
    genre,
    gender,
    birthDate,
    streetWhereFound,
    cityWhereFound,
    postalCodeWhereFound,
    dateOfSecurity,
    residence,
    stateOfHealth,
  } = formData

  const animal = await prisma.animal.create({
    data: {
      photoUrl: photo,
      name,
      type: genre === AnimalType.CAT ? Type.CAT : Type.DOG,
      gender: gender === AnimalGender.MALE ? Gender.MALE : Gender.FEMALE,
      birthDate,
      locationWhereFound: `${cityWhereFound} ${postalCodeWhereFound} ${streetWhereFound}`,
      timeWhenFound: dateOfSecurity,
      residence: residence === AnimalResidence.BASE ? Residence.BASE : Residence.TEMPORARY_HOME,
      descriptionOfHealth: stateOfHealth,
      userId: userId,
      // homeId: home ? home?.id : null,
    },
  })
  await prisma.healthCard.create({ data: { animalId: animal.id } })
  await fetch(`${baseUrl}/revalidate?tag=animal-collection&secret=${process.env.MY_SECRET_TOKEN}`, { method: "POST" })
  revalidateTag("animal-collection")
  redirect(Routes.DASHBOARD)
}
