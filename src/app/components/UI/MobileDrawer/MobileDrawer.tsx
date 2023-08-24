"use client"
import React from "react"
import { SidebarButton } from "../Sidebar/SidebarButton"
import { Routes } from "@/app/types/routes"
import { cn } from "@/app/lib/cn"
import { RiAdminFill, RiDashboardFill, RiHome4Fill } from "react-icons/ri"
import { SignOutButton } from "../SignOutButton"
import { BiMenuAltRight } from "react-icons/bi"
import { Logo } from ".."
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { closeSidebar, toggleSidebar } from "@/redux/features/uiSlice"

export const MobileDrawer = () => {
  const isOpen = useAppSelector((state) => state.uiReducer.sidebarIsOpen)
  const dispatch = useAppDispatch()

  const handlerCloseSidebar = () => dispatch(closeSidebar())

  return (
    <div>
      <div className="fixed top-0 flex items-center justify-between w-full h-16 p-2 bg-white border-b sm:hidden border-neutral-200">
        <Logo />
        <div
          className="p-2 text-xl rounded-full hover:bg-neutral-100"
          onClick={() => dispatch(toggleSidebar())}
        >
          <BiMenuAltRight />
        </div>
      </div>
      <div
        className={cn(
          "fixed w-full h-full bg-white top-16 -right-full duration-200 ease-in-out z-20 p-4 max-sm:flex flex-col justify-evenly hidden",
          {
            "right-0": isOpen,
          }
        )}
      >
        <div className="h-[80%]">
          <div onClick={handlerCloseSidebar}>
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
        </div>
        <div
          className="h-[10%]"
          onClick={handlerCloseSidebar}
        >
          <SignOutButton />
        </div>
      </div>
    </div>
  )
}
