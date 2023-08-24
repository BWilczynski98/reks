import React from "react"
import { SidebarButton } from "../Sidebar/SidebarButton"
import { Routes } from "@/app/types/routes"
import { cn } from "@/app/lib/cn"
import { RiAdminFill, RiDashboardFill, RiHome4Fill } from "react-icons/ri"
import { SignOutButton } from "../SignOutButton"

export const MobileDrawer = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div
      className={cn(
        "fixed w-full h-full bg-white top-16 -right-full duration-200 ease-in-out z-20 p-4 max-sm:flex flex-col justify-evenly hidden",
        {
          "right-0": isOpen,
        }
      )}
    >
      <div className="h-[80%]">
        <SidebarButton
          href={Routes.ADMIN}
          icon={<RiAdminFill />}
        >
          Panel administratora
        </SidebarButton>
        <SidebarButton
          href={Routes.DASHBOARD}
          icon={<RiDashboardFill />}
        >
          Panel główny
        </SidebarButton>
        <SidebarButton
          href={Routes.ADMIN}
          icon={<RiHome4Fill />}
        >
          Dom tymczasowy
        </SidebarButton>
      </div>
      <div className="h-[10%]">
        <SignOutButton />
      </div>
    </div>
  )
}
