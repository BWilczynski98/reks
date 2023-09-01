"use client"
import { body } from "@/app/lib/fonts"
import { signOut } from "next-auth/react"
import React from "react"
import { CgLogOut } from "react-icons/cg"

export const SignOutButton = () => {
  return (
    <div
      className={body.className}
      onClick={() => signOut()}
    >
      <div className="flex items-center gap-2 p-2 font-medium cursor-pointer text-neutral-800 hover:bg-neutral-100 rounded-default">
        <CgLogOut />
        Wyloguj
      </div>
    </div>
  )
}
