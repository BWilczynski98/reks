"use client"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { useEdgeStore } from "@/lib/edgestore"
import { useDeleteAnimalMutation, useGetAllAnimalQuery, useGetAnimalByIdQuery } from "@/redux/services/animalApi"
import { AnimalGender, AnimalResidence, AnimalStatus, AnimalType } from "@/types/animal"
import { Gender, Residence, Status, Type } from "@prisma/client"
import { formatDistanceToNow } from "date-fns"
import pl from "date-fns/locale/pl"
import { PawPrint } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { notFound, useRouter } from "next/navigation"
import { Routes } from "@/types/routes"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Props = {
  animalId: string
}

type RowProps = {
  fieldName: string
  value: string
}

export const Row = ({ fieldName, value }: RowProps): React.ReactElement => {
  return (
    <div className="flex">
      <div className="text-neutral-400 w-full">
        <p>{fieldName}:</p>
      </div>
      <div className="w-full text-justify font-semibold">
        {fieldName === "Dom tymczasowy" ? (
          <Link
            href={`/temporaryHomeProfile/${value}`}
            className="text-primary hover:underline underline-offset-2"
          >
            Pokaż profil
          </Link>
        ) : (
          <p>{value}</p>
        )}
      </div>
    </div>
  )
}

const LoadingTile = () => {
  return (
    <div className="flex flex-col gap-3 basis-full lg:basis-3/4">
      <div>
        <Skeleton className="w-36 h-6" />
      </div>
      <div className="flex">
        <div className="space-y-4 w-1/3">
          <Skeleton className="h-4 w-3/5" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-2/5" />
          <Skeleton className="h-4 w-3/5" />
          <Skeleton className="h-4 w-3/5" />
        </div>
        <div className="space-y-4 w-2/3">
          <Skeleton className="h-4 w-1/5" />
          <Skeleton className="h-4 w-2/5" />
          <Skeleton className="h-4 w-1/5" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-2/5" />
        </div>
      </div>
    </div>
  )
}

export const Profile = ({ animalId }: Props) => {
  const { data: animal, error } = useGetAnimalByIdQuery(animalId)
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const { toast } = useToast()
  const { edgestore } = useEdgeStore()
  const { refetch: refetchAnimalQuery } = useGetAllAnimalQuery()
  const [deleteAnimal] = useDeleteAnimalMutation()
  const router = useRouter()

  if (error) {
    notFound()
  }

  // Formatting the address where the animal was caught
  const whereFoundParts = animal?.locationWhereFound.split(" ")
  let formattedAddress = ""
  if (whereFoundParts) {
    const city = whereFoundParts[0]
    const postalCode = whereFoundParts[1]
    const address_1 = whereFoundParts[2]
    const address_2 = whereFoundParts[3] ? whereFoundParts[3] : ""
    formattedAddress = `${city} ${postalCode.slice(0, 2)}-${postalCode.slice(2)} ul. ${address_1} ${address_2}`
  }

  const statusFormatting = (status: string) => {
    switch (status) {
      case Status.ADAPTED:
        return AnimalStatus.ADAPTED
      case Status.FOR_ADOPTION:
        return AnimalStatus.FOR_ADOPTION
      case Status.QUARANTINE:
        return AnimalStatus.QUARANTINE
      case Status.UNADOPTABLE:
        return AnimalStatus.UNADOPTABLE
      default:
        return AnimalStatus.UNADOPTABLE
    }
  }

  const handleDeleteAnimalProfile = async (id: string) => {
    await deleteAnimal({ id: id })
      .then(() => {
        if (animal) {
          for (const url of animal?.photoUrl) {
            edgestore.publicFiles.delete({
              url,
            })
          }
          toast({
            description: `Profil ${animal.name} został usunięty.`,
          })
        }
        refetchAnimalQuery()
        router.push(Routes.DASHBOARD)
      })
      .catch((err) =>
        toast({
          description: "Coś poszło nie tak, spróbuj jeszcze raz",
        })
      )
      .finally(() => setShowDeleteDialog(false))
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Profil zwierzęcia</CardTitle>
          <Link
            href={Routes.DASHBOARD}
            className="text-primary hover:underline underline-offset-4 font-semibold text-sm"
          >
            Wróc do strony głównej
          </Link>
        </CardHeader>
        <CardContent>
          {/* Image */}
          <div className="flex justify-between">
            <div className="relative w-52 h-52">
              {animal ? (
                animal.photoUrl.length ? (
                  <AspectRatio ratio={1 / 1}>
                    <Image
                      src={animal.photoUrl[0]}
                      priority={true}
                      fill
                      style={{
                        objectFit: "cover",
                        borderRadius: "100%",
                      }}
                      alt="Zdjęcie profilowe zwierzęcia"
                    />
                  </AspectRatio>
                ) : (
                  <div className="w-full h-full bg-[#F3F4F6] dark:bg-[#1F2937] rounded-full flex justify-center items-center">
                    <PawPrint className="w-8 h-8" />
                  </div>
                )
              ) : (
                <Skeleton className="w-full h-full rounded-full" />
              )}
            </div>
            {animal ? (
              <div className="flex flex-col gap-3 basis-full lg:basis-3/4">
                <div className="flex gap-2">
                  <p className="text-xl font-semibold text-primary-700">{animal?.name}</p>
                </div>
                <Row
                  fieldName="Gatunek"
                  value={animal?.type === Type.DOG ? AnimalType.DOG : AnimalType.CAT}
                />
                <Row
                  fieldName="Płeć"
                  value={animal?.gender === Gender.MALE ? AnimalGender.MALE : AnimalGender.FEMALE}
                />
                <Row
                  fieldName="Wiek"
                  value={formatDistanceToNow(new Date(animal?.birthDate), { locale: pl })}
                  // value={animal.birthDate}
                />
                <Row
                  fieldName="Miejsce zabezpieczenia"
                  value={formattedAddress}
                />
                <Row
                  fieldName="Gdzie przebywa"
                  value={animal?.residence === Residence.BASE ? AnimalResidence.BASE : AnimalResidence.TEMPORARY_HOME}
                />
                {animal?.residence === Residence.TEMPORARY_HOME ? (
                  <>
                    <Row
                      fieldName="Dom tymczasowy"
                      value={animal?.residence === Residence.TEMPORARY_HOME ? (animal.homeId as string) : ""}
                    />
                  </>
                ) : null}
                <Row
                  fieldName="Status"
                  value={statusFormatting(animal.status)}
                />
                {/* <div className="flex">
                  <div className="text-neutral-400 w-full">
                    <p>Status:</p>
                  </div>
                  <div className="w-full text-justify font-semibold">
                    <Select defaultValue={animal.status}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={statusFormatting(animal.status)} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value={Status.ADAPTED}>{AnimalStatus.ADAPTED}</SelectItem>
                          <SelectItem value={Status.FOR_ADOPTION}>{AnimalStatus.FOR_ADOPTION}</SelectItem>
                          <SelectItem value={Status.QUARANTINE}>{AnimalStatus.QUARANTINE}</SelectItem>
                          <SelectItem value={Status.UNADOPTABLE}>{AnimalStatus.UNADOPTABLE}</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div> */}
                <Row
                  fieldName="Stan zdrowia w dniu przyjęcia"
                  value={animal?.descriptionOfHealth ? animal.descriptionOfHealth : "Brak uwag"}
                />
                <Row
                  fieldName="Uwagi dodatkowe"
                  value={animal?.description ? animal.description : "Brak uwag"}
                />
              </div>
            ) : (
              <LoadingTile />
            )}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full justify-center">
            <Button
              className="max-w-[150px]"
              variant="destructive"
              onClick={() => setShowDeleteDialog(true)}
            >
              Usuń profil
            </Button>
          </div>
        </CardFooter>
      </Card>
      <AlertDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Czy na pewno chcesz usunąć profil zwierzęcia?</AlertDialogTitle>
            <AlertDialogDescription>
              Potwierdzając usuniesz profil&nbsp;<span className="font-bold">{animal?.name}</span>, tej czynności nie
              można cofnąć.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anuluj</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => {
                handleDeleteAnimalProfile(animalId)
              }}
            >
              Usuń
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
