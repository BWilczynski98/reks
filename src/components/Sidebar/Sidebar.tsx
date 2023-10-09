"use client"
import { cn } from "@/lib/utils"
import { ModeToggle } from "../ModeToggle/ModeToggle"

export const Sidebar = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("border-r border h-screen w-60", className)}>
      <ModeToggle />
      {/* <div>
        <Button onClick={() => signOut()}>Wyloguj</Button>
      </div> */}
    </div>
  )
}
