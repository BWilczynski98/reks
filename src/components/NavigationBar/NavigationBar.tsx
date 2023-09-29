"use client"
import Image from "next/image"
import { ModeToggle } from "../ModeToggle/ModeToggle"
import { Button } from "../ui/button"
import { signOut } from "next-auth/react"

export const NavigationBar = () => {
  return (
    <div className="flex justify-between py-5">
      <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        className="dark:invert"
        width={100}
        height={24}
        priority
      />
      <ModeToggle />
      <div>
        <Button onClick={() => signOut()}>Wyloguj</Button>
      </div>
    </div>
  )
}
