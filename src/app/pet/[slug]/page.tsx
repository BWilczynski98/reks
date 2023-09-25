import { PetProfile } from "@/app/components/PetProfile"

const getData = async (id: string) => {
  const pet = await fetch(
    `https://reks-git-reks-40-animal-profile-bwilczynski98.vercel.app/api/animal/getById?id=${id}`,
    {
      next: { tags: ["animal"] },
    }
  )

  return pet.json()
}

const getHealthCard = async (id: string) => {
  const healthCard = await fetch(
    `https://reks-git-reks-40-animal-profile-bwilczynski98.vercel.app/api/animal/healthCard/get?id=${id}`,
    {
      next: { tags: ["healthCard"] },
    }
  )

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
