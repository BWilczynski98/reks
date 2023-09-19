"use client"
import { body, headline } from "@/app/lib/fonts"
import { AllergyCategory } from "@/app/types/health"
import { useGetAnimalByIdQuery } from "@/redux/services/animalApi"
import { Card } from "../UI/Card/Card"
import { BasicInformation } from "./components/BasicInformation"
import { HealthCard } from "./components/HealthCard"

type Props = {
  id: string
}

export const PetProfile = ({ id }: Props) => {
  const today = new Date()
  const { data: pet } = useGetAnimalByIdQuery(id)
  const healthRecords = {
    allergies: [],
    drugs: [],
    vaccination: [],
  }

  return (
    <Card>
      {pet ? (
        <div className={`${body.className}`}>
          <header className={`${headline.className} mb-5`}>
            <h1 className="text-xl font-bold text-neutral-800">Informacje o zwierzęciu</h1>
          </header>
          <main className="flex flex-col gap-10">
            <BasicInformation pet={pet} />
            <HealthCard healthRecords={healthRecords} />
          </main>
        </div>
      ) : (
        "loading..."
      )}
    </Card>
  )
}
