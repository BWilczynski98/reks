import { PetProfile } from "@/app/components/PetProfile"
import { server } from "@/app/config"

const getData = async (id: string) => {
  const pet = await fetch(`${server}/api/animal/getById?id=${id}`, {
    next: { tags: ["animal"] },
  })

  return pet.json()
}

const getHealthCard = async (id: string) => {
  const healthCard = await fetch(`${server}/api/animal/healthCard/get?id=${id}`, {
    next: { tags: ["healthCard"] },
    cache: "no-store",
  })

  return healthCard.json()
}

export default async function PetPage({ params }: { params: { slug: string } }) {
  const petId = params.slug
  const pet = await getData(petId)
  const healthCard = await getHealthCard(petId)

  return (
    <div className="container mx-auto py-5">
      <PetProfile
        pet={pet}
        healthRecords={healthCard}
      />
    </div>
  )
}
