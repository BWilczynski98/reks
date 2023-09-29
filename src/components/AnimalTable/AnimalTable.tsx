"use client"

import { useGetAllAnimalQuery } from "@/redux/services/animalApi"

export const AnimalTable = () => {
  const { data } = useGetAllAnimalQuery()

  return <div>{data?.map((animal: any) => <p key={animal.id}>{animal.name}</p>)}</div>
}
