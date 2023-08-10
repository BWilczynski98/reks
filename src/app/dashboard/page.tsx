"use client"
import React from "react"
import { Button } from "@components/UI"
import { signOut } from "next-auth/react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const page = () => {
  const notify = () => toast("Wow so easy!")
  return (
    <div className="w-28">
      <button onClick={notify}>Notify!</button>
      <ToastContainer />
    </div>
  )
}

export default page
