import { PetProfile } from "@/app/components/PetProfile"

export default function PetPage({ params }: { params: { slug: string } }) {
  const petId = params.slug

  return (
    <div className="container mx-auto py-5">
      <PetProfile id={petId} />{" "}
    </div>
  )
}
