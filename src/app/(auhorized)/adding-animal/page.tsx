import { AnimalCreationForm } from "../../components/AnimalCreationForm"

export default function CreateAnimalFormPage() {
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col w-full max-w-3xl gap-5 px-4 py-2 bg-white shadow-sm rounded-default">
        <AnimalCreationForm />
      </div>
    </div>
  )
}
