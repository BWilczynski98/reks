import { baseUrl } from "@/app/api/baseUrl"

export const AnimalTable = async ({ data }: { data: any }) => {
  console.log(data)
  return (
    <div>
      {data.map((animal: any) => (
        <p key={animal.id}>{animal.name}</p>
      ))}
    </div>
  )
}
