"use client"
import { ModeToggle } from "@/components"
import { UserTile } from "@/components/Navigation/components/user-tile"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { closeSidebar } from "@/redux/features/uiSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { Routes } from "@/types/routes"
import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

type TypeNavLink = {
  label: string
  href: string
  icon?: React.ReactNode
}

const NavLink = ({ label, href, icon }: TypeNavLink) => {
  const currentPath = usePathname()

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center space-x-2 hover:bg-accent duration-150 ease-in rounded-md p-2 w-full font-semibold",
        {
          "bg-accent": currentPath === href,
        }
      )}
    >
      <div>{icon}</div>
      <div>{label}</div>
    </Link>
  )
}

export const MobileDrawer = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  const isOpen = useAppSelector((state) => state.uiReducer.sidebarIsOpen)
  const dispatch = useAppDispatch()
  const handlerCloseSidebar = () => dispatch(closeSidebar())
  const currentPath = usePathname()
  return (
    <Sheet>
      <SheetTrigger className={className}>
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <div className={cn("min-h-screen flex flex-col justify-between py-6 px-2  h-full")}>
          <div className="flex items-center justify-between">
            <h2 className="px-2 text-2xl font-semibold tracking-tight">
              <span className="text-primary">Reks</span> manager
            </h2>
            <ModeToggle />
          </div>
          <div className="grow py-5 space-y-2 flex flex-col justify-between">
            <div className="h-full flex flex-col justify-between">
              <div className="space-y-2">
                <SheetClose asChild>
                  <Link
                    href={Routes.ADMIN}
                    className={cn(
                      "flex items-center space-x-2 hover:bg-accent duration-150 ease-in rounded-md p-2 w-full font-semibold",
                      {
                        "bg-accent": currentPath === Routes.ADMIN,
                      }
                    )}
                  >
                    <div></div>
                    <div>Panel administratora</div>
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    href={Routes.DASHBOARD}
                    className={cn(
                      "flex items-center space-x-2 hover:bg-accent duration-150 ease-in rounded-md p-2 w-full font-semibold",
                      {
                        "bg-accent": currentPath === Routes.DASHBOARD,
                      }
                    )}
                  >
                    <div></div>
                    <div>Panel główny</div>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href={Routes.TEMPORARY_HOMES}
                    className={cn(
                      "flex items-center space-x-2 hover:bg-accent duration-150 ease-in rounded-md p-2 w-full font-semibold",
                      {
                        "bg-accent": currentPath === Routes.TEMPORARY_HOMES,
                      }
                    )}
                  >
                    <div></div>
                    <div>Domy tymczasowe</div>
                  </Link>
                </SheetClose>
              </div>
              <div>
                <UserTile />
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
