"use client"
import { toggleSidebar } from "@/redux/features/uiSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { Metadata } from "next"
import React from "react"
import { BiMenuAltRight } from "react-icons/bi"
import { Logo, Sidebar } from "../components/UI"
import { MobileDrawer } from "../components/UI/MobileDrawer"
import { cn } from "../lib/cn"
import { body } from "../lib/fonts"

export const metadata: Metadata = {
  title: "Reks",
}

const ForgotPasswordLayout = ({ children }: { children: React.ReactNode }) => {
  const isOpen = useAppSelector((state) => state.uiReducer.sidebarIsOpen)
  const dispatch = useAppDispatch()

  return (
    <div className={`flex ${body.className} max-sm:flex-col`}>
      <div className="max-sm:hidden">
        <Sidebar />
      </div>
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
        className={cn("w-full h-screen py-20 sm:py-10 sm:overflow-auto", {
          "overflow-hidden": isOpen,
        })}
      >
        <MobileDrawer isOpen={isOpen} />
        {children}
      </div>
    </div>
  )
}

export default ForgotPasswordLayout
