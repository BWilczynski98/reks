export default async function AnimalPage({ params }: { params: { slug: string } }) {
  const animalId = params.slug

  return <div className="container mx-auto py-5">{`Animal profile ${animalId}`}</div>
}
