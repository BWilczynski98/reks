export default async function TemporaryHomePage({ params }: { params: { slug: string } }) {
  const temporaryHomeId = params.slug

  return <div className="container mx-auto py-5">Dom tymczasowy o id: {temporaryHomeId}</div>
}
