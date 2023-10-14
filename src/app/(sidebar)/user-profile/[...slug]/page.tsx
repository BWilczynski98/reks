export default async function AnimalPage({ params }: { params: { slug: string } }) {
  const userId = params.slug
  return <div>User profile page id: {userId}</div>
}
