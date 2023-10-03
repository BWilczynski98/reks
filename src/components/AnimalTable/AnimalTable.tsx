"use client"

import { useGetAllAnimalQuery } from "@/redux/services/animalApi"

export const AnimalTable = () => {
  const { data } = useGetAllAnimalQuery()

  return (
    <div>
      {data?.map((animal: any, index) => (
        <div key={animal.id}>
          <p>{animal.name}</p>
        </div>
      ))}
    </div>
  )
}
