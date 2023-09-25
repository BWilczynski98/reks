import { body, headline } from "@/app/lib/fonts"
import { HealthRecords } from "@/app/types/health"
import { Card } from "../UI/Card/Card"
import { BasicInformation } from "./components/BasicInformation"
import { HealthCard } from "./components/HealthCard"

type Props = {
  pet: Animal
  healthRecords?: HealthRecords
}

export const PetProfile = ({ pet, healthRecords }: Props) => {
  return (
    <Card>
      {pet ? (
        <div className={`${body.className}`}>
          <header className={`${headline.className} mb-5`}>
            <h1 className="text-xl font-bold text-neutral-800">Informacje o zwierzęciu</h1>
          </header>
          <main className="flex flex-col gap-10">
            <BasicInformation pet={pet} />
            {healthRecords ? <HealthCard healthRecords={healthRecords} /> : null}
          </main>
        </div>
      ) : (
        "loading..."
      )}
    </Card>
  )
}
