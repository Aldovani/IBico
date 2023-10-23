import { AnimationEvent, useState } from 'react'

export function useModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLeave, setIisLeave] = useState(false)

  function handleAnimationEndClose(e: AnimationEvent<HTMLDivElement>) {
    if (e.animationName === 'fadeOut') {
      setIisLeave(false)
      setIsOpen(false)
    }
  }

  function handleCloseModal() {
    setIisLeave(true)
  }
  function handleOpenModal() {
    setIsOpen(true)
  }

  return {
    isOpen,
    handleOpenModal,
    handleCloseModal,
    isLeave,
    handleAnimationEndClose,
  }
}
