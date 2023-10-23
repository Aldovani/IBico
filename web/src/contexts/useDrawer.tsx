import { useState } from 'react'

export function useDrawer() {
  const [isOpen, setIsOpen] = useState(false)

  function onClose() {
    setIsOpen(false)
  }

  function onOpen() {
    setIsOpen(true)
  }

  return {
    isOpen,
    onOpen,
    onClose,
  }
}
