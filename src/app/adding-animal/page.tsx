"use client"
import { useCreateAnimalMutation } from "@/redux/services/animalApi"
import { Button } from "@components/UI"
import { Gender, Residence, Status, Type } from "@prisma/client"
import { useSession } from "next-auth/react"

export default function CreateAnimalFormPage() {
  const session = useSession()
  const [createAnimal] = useCreateAnimalMutation()

  const animal = {
    name: "Kora",
    type: Type.DOG,
    gender: Gender.FEMALE,
    birthDate: "2023-08-12T12:40:03.642Z",
    locationWhereFound: "Malbork 82-200 ul.Grunwaldzka",
    timeWhenFound: "2023-08-12T12:40:03.642Z",
    residence: Residence.BASE,
    status: Status.FOR_ADOPTION,
    userId: session.data?.user.id,
  }
  const handleAdd = async () => {
    createAnimal({ ...animal })
      .unwrap()
      .then((res) => console.log(res))
      .catch((error) => console.log(error))
  }
  return (
    <div className="w-40">
      <Button onClick={handleAdd}>Dodaj zwierze</Button>
    </div>
  )
}
