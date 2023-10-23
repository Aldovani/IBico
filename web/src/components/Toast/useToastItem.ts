import { AnimationEvent, useEffect, useRef, useState } from 'react'

type useToastItemProps = {
  id: number
  onClose: (id: number) => void
}

export function useToastItem({ onClose, id }: useToastItemProps) {
  const [isLeaving, setIsLeaving] = useState(false)
  const toastRef = useRef<NodeJS.Timeout | undefined>(undefined)

  function handleAnimationEnd(e: AnimationEvent<HTMLLIElement>) {
    if (e.animationName === 'leaveRight') {
      onClose(id)
    }
  }

  function handleClose() {
    setIsLeaving(true)
    clearTimeout(toastRef.current)
  }

  useEffect(() => {
    toastRef.current = setTimeout(() => {
      setIsLeaving(true)
    }, 1000 * 5)

    return () => clearTimeout(toastRef.current)
  }, [])

  return {
    isLeaving,
    handleClose,
    handleAnimationEnd,
  }
}
