"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronsLeftRight } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

const LoadingTile = () => {
  return (
    <div className="flex justify-between items-center px-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-32" />
      </div>
      <div>
        <Skeleton className="h-4 w-4" />
      </div>
    </div>
  )
}

export const UserTile = () => {
  const { data } = useSession()
  const user = data?.user
  const userName = user?.name
  const userEmail = user?.email

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="py-6"
          >
            <Button
              asChild
              variant="ghost"
            >
              <div className="flex w-full justify-between items-center">
                <div>
                  <div className="text-base font-semibold">
                    <p>{userName}</p>
                  </div>
                  <div className="text-sm text-zinc-400 font-extralight">
                    <p>{userEmail}</p>
                  </div>
                </div>
                <div className="rotate-90 text-zinc-400">
                  <ChevronsLeftRight className="w-4 h-4" />
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem disabled>Zmień hasło</DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>Wyloguj</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <LoadingTile />
      )}
    </>
  )
}
