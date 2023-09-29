import { baseUrl } from "@/app/api/baseUrl"

async function getData() {
  const res = await fetch(`${baseUrl}/animal/get`, {
    next: { tags: ["animal-collection"] },
  })
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  return res.json()
}

export const AnimalTable = async () => {
  const data = await getData()
  console.log(data)
  return (
    <div>
      {data.map((animal: any) => (
        <p key={animal.id}>{animal.name}</p>
      ))}
    </div>
  )
}
