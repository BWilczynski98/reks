import { TableOfUsers } from "@/app/components/TableOfUsers"
import { UserCreationForm } from "@/app/components/UserCreationForm"
import { body } from "@lib/fonts"
import "react-toastify/dist/ReactToastify.css"

export default function AdminPage() {
  return (
    <div className={`${body.className} flex flex-col p-2 gap-5 container mx-auto`}>
      <div className="w-full sm:w-96">
        <UserCreationForm />
      </div>
      <TableOfUsers />
    </div>
  )
}
