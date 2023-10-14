import { UserActiavteForm } from "./components/user-activate-form"

export default function ActivatePage({ params }: { params: { slug: string } }) {
  const activateToken = params.slug

  return (
    <main className="flex container h-screen">
      <div className="w-full h-full flex justify-center items-center">
        <UserActiavteForm token={activateToken} />
      </div>
    </main>
  )
}
