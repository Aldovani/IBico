import { MouseEvent, ReactNode } from 'react'
import { useDrawerComponent } from './context'

type OverlayProps = {
  children?: ReactNode
}

type OverlayMouseEventTarget = {
  id: string
} & EventTarget

export type OverlayMouseEvent = {
  target: OverlayMouseEventTarget
} & MouseEvent<HTMLDivElement, globalThis.MouseEvent>

export function Overlay({ children }: OverlayProps) {
  const { isOpen, onClose } = useDrawerComponent()

  function handleClick(e: OverlayMouseEvent) {
    if (isOpen && e.target.id === 'drawer-overlay') {
      onClose()
    }
  }

  return (
    <div
      id="drawer-overlay"
      onClick={(e: OverlayMouseEvent) => handleClick(e)}
      data-open={isOpen}
      className="
      fixed w-screen  h-screen bg-slate-900 bg-opacity-5
      top-0 left-0 scale-x-0 translate-x-full  transition-all
      z-50
      delay-150 opacity-0 
      data-[open='true']:scale-x-100 data-[open='true']:translate-x-0 
      data-[open='true']:delay-0 data-[open='true']:opacity-100"
    >
      {children}
    </div>
  )
}
