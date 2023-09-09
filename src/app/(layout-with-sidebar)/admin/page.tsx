"use client"
import { Card } from "@/app/components/UI/Card/Card"
import { UserCreationForm } from "@/app/components/UserCreationForm"
import { body } from "@lib/fonts"
import "react-toastify/dist/ReactToastify.css"

export default function AdminPage() {
  return (
    <main className={`${body.className} flex flex-col p-2 w-96`}>
      <Card>
        <UserCreationForm />
      </Card>
    </main>
  )
}
