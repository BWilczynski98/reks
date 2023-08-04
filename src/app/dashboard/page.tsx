"use client"
import React from "react"
import { Button } from "../components/UI"
import { signOut } from "next-auth/react"

const page = () => {
  return (
    <div className="w-28">
      <Button onClick={() => signOut()}>Wyloguj</Button>
    </div>
  )
}

export default page
