'use client'

import { ReactNode } from 'react'
import { ReactPortal } from '../ReactPortal'
import { OverlayMouseEvent, useOverlay } from './useOverlay'

type ContainerProps = {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
}

export function Overlay({ children, isOpen = false, onClose }: ContainerProps) {
  const { handleClickCloseModal } = useOverlay({
    handleClose: onClose,
    isOpen,
  })

  return (
    <ReactPortal containerId="container-modal">
      <div
        id="overlay-modal"
        data-open={isOpen}
        onClick={(e: OverlayMouseEvent) => handleClickCloseModal(e)}
        className="z-40 flex items-center justify-center w-screen h-screen fixed top-0 left-0 bg-slate-900 bg-opacity-5 scale-0 opacity-0 data-[open='true']:scale-100 data-[open='true']:opacity-100 "
      >
        {children}
      </div>
    </ReactPortal>
  )
}
