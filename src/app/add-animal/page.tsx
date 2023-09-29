"use client"
import { AnimalForm } from "@/components"
import { useGetAllAnimalQuery } from "@/redux/services/animalApi"
import { useEffect } from "react"

export default function AddAnimalPage() {
  const { refetch } = useGetAllAnimalQuery()

  return (
    <main className="container mx-auto py-5">
      <AnimalForm />
    </main>
  )
}
