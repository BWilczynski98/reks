import { Severity } from "@/app/types/alert"
import type { Severity as SeverityType } from "@/app/types/alert"
import React, { useState } from "react"

type Props = {
  severity: SeverityType | null

  message: string
  isOpen: boolean
}

export const useAlert = () => {
  const [alert, setAlert] = useState<Props>({ severity: null, message: "", isOpen: false })

  const checkStatusCategory = (status: number): Severity | null => {
    const statusParseToString = status.toString()
    const firstDigit = statusParseToString.charAt(0)
    switch (firstDigit) {
      case "1":
        return Severity.INFO
      case "2":
        return Severity.SUCCESS
      case "3":
        return Severity.INFO
      case "4":
        return Severity.ERROR
      case "5":
        return Severity.ERROR
      default:
        return Severity.INFO
    }
  }

  const handleOpen = ({ status, data }: { status: number; data: string }) => {
    setAlert({
      severity: checkStatusCategory(status),
      message: data,
      isOpen: true,
    })
  }
  const handleClose = () => setAlert({ severity: null, message: "", isOpen: false })

  return { alert, handleOpen, handleClose }
}
