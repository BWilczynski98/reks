"use client"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { useDeleteAccountMutation, useGetListOfUsersQuery } from "@/redux/services/userApi"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"

type DataTableRowActionsProps = {
  userId: string
  userEmailAddress: string
}

export function DataTableRowActions({ userId, userEmailAddress }: DataTableRowActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const { toast } = useToast()
  const { refetch: refetchUserQuery } = useGetListOfUsersQuery()
  const [deleteAccount] = useDeleteAccountMutation()
  const session = useSession()
  const currentUserId = session.data?.user.id
  const buttonDeactivationCondition = currentUserId === userId

  const handleDeactiveUserProfile = async (id: string) => {
    console.log(id)
    await deleteAccount(userId)
      .then(() => {
        toast({
          description: `Profil ${userEmailAddress} został usunięty.`,
        })
        refetchUserQuery()
      })
      .catch((err) => {
        console.log(err)
        toast({
          description: "Coś poszło nie tak, spróbuj jeszcze raz",
        })
      })
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
          <Link href={`/user-profile/${userId}`}>
            <DropdownMenuItem>Otwórz profil</DropdownMenuItem>
          </Link>

          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="text-red-600"
            disabled={buttonDeactivationCondition}
          >
            Usuń
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Czy na pewno chcesz usunąć profil użytkownika?</AlertDialogTitle>
            <AlertDialogDescription>
              Potwierdzając usuniesz profil&nbsp;<span className="font-bold">{userEmailAddress}</span>. Ta czynność nie
              można cofnąć.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anuluj</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => {
                handleDeactiveUserProfile(userId)
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
