"use client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { useEdgeStore } from "@/lib/edgestore"
import { useDeleteAnimalMutation, useGetAllAnimalQuery } from "@/redux/services/animalApi"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
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
import { Routes } from "@/types/routes"

type DataTableRowActionsProps = {
  animalId: string
  animalName: string
  animalPhotoUrls: string
}

export function DataTableRowActions({ animalId, animalName, animalPhotoUrls }: DataTableRowActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const { toast } = useToast()
  const { edgestore } = useEdgeStore()
  const { refetch: refetchAnimalQuery } = useGetAllAnimalQuery()
  const [deleteAnimal] = useDeleteAnimalMutation()

  const handleDeleteAnimalProfile = async (id: string) => {
    await deleteAnimal({ id: id })
      .then(() => {
        for (const url of animalPhotoUrls) {
          edgestore.publicFiles.delete({
            url,
          })
        }
        toast({
          description: `Profil ${animalName} został usunięty.`,
        })
        refetchAnimalQuery()
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Otwórz menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[160px]"
        >
          <Link href={`${Routes.ANIMAL_PROFILE}/${animalId}`}>
            <DropdownMenuItem>Otwórz profil</DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="text-red-600"
          >
            Usuń
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Czy na pewno chcesz usunąć profil zwierzęcia?</AlertDialogTitle>
            <AlertDialogDescription>
              Potwierdzając usuniesz profil&nbsp;<span className="font-bold">{animalName}</span>, tej czynności nie
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
