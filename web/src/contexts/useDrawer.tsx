import { useState } from 'react'

export function useDrawer() {
  const [isOpen, setIsOpen] = useState(false)

  function handleClose() {
    setIsOpen(false)
  }

  function handleOpen() {
    setIsOpen(true)
  }

  return {
    isOpen,
    handleClose,
    handleOpen,
  }
}
