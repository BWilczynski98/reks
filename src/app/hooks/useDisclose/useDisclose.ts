import React, { useState } from "react"

export const useDisclose = () => {
  const [state, setState] = useState<boolean>(false)

  const handleOpen = () => setState(true)
  const handleClose = () => setState(false)

  return { state, handleOpen, handleClose }
}
