import { cn } from "@/lib/utils"
import { Routes } from "@/types/routes"
import { ModeToggle } from "../ModeToggle/ModeToggle"
import { NavLink } from "./components/NavLink"
import { UserTile } from "./components/UserTile"

export const Sidebar = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("border-r border h-screen w-64 flex flex-col justify-between py-6 px-2", className)}>
      <div className="flex items-center justify-between">
        <h2 className="px-4 text-2xl font-semibold tracking-tight">
          <span className="text-primary">Reks</span> manager
        </h2>
        <ModeToggle />
      </div>
      <div className="grow py-5 space-y-2">
        <NavLink
          label="Panel administratora"
          href={Routes.ADMIN}
        />
        <NavLink
          label="Panel główny"
          href={Routes.DASHBOARD}
        />
        <NavLink
          label="Domy tymczasowe"
          href={Routes.TEMPORARY_HOMES}
        />
      </div>
      <div>
        <UserTile />
      </div>
    </div>
  )
}
