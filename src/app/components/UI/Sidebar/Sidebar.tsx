import { Routes } from "@/app/types/routes"
import { RiAdminFill, RiDashboardFill, RiHome4Fill } from "react-icons/ri"
import { SignOutButton } from "../SignOutButton"
import { SidebarButton } from "./SidebarButton"
import { Logo } from ".."

export const Sidebar = () => {
  return (
    <div className="flex flex-col justify-between w-64 h-screen p-4 bg-white">
      <div className="h-[10%]">
        <Logo />
      </div>
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
      <div className="h-[10%]flex flex-col justify-center">
        <SignOutButton />
      </div>
    </div>
  )
}
