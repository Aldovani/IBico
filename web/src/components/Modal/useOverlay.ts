import { MouseEvent, useCallback, useEffect } from 'react'

type useOverlayProps = {
  handleClose: () => void
  isOpen: boolean
}

type OverlayMouseEventTarget = {
  id: string
} & EventTarget

export type OverlayMouseEvent = {
  target: OverlayMouseEventTarget
} & MouseEvent<HTMLDivElement, globalThis.MouseEvent>

export function useOverlay({ handleClose, isOpen }: useOverlayProps) {
  const handleKeyDownCloseModal = useCallback(
    (event: globalThis.KeyboardEvent) => {
      if (!isOpen) return
      if (event.key === 'Escape') handleClose()
    },
    [isOpen, handleClose],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDownCloseModal)

    return () =>
      document.removeEventListener('keydown', handleKeyDownCloseModal)
  }, [handleKeyDownCloseModal, isOpen, handleClose])

  function handleClickCloseModal(event: OverlayMouseEvent) {
    if (!isOpen) return
    if (event.target.id === 'overlay-modal') handleClose()
  }

  return {
    handleClickCloseModal,
  }
}
