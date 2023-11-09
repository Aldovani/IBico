import { AnimationEvent, useState } from 'react'

export function useModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLeave, setIisLeave] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  function handleAnimationEndClose(e: AnimationEvent<HTMLDivElement>) {
    if (e.animationName === 'fadeIn') {
      setIsMounted(true)
    }
    if (e.animationName === 'fadeOut') {
      setIisLeave(false)
      setIsOpen(false)
    }
  }

  function handleClose() {
    setIisLeave(true)
    setIsMounted(false)
  }
  function handleOpen() {
    setIsOpen(true)
  }

  return {
    isOpen,
    handleOpen,
    handleClose,
    isLeave,
    isMounted,
    handleAnimationEndClose,
  }
}
