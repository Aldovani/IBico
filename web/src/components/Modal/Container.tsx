import { AnimationEvent, ReactNode, useEffect, useRef } from 'react'

type ContainerProps = {
  children: ReactNode
  isOpen: boolean
  isLeave: boolean
  onAnimationEnd: (e: AnimationEvent<HTMLDivElement>) => void
}
export function Container({
  children,
  isOpen = false,
  isLeave = false,
  onAnimationEnd,
}: ContainerProps) {
  const modalRef = useRef(0)

  console.log(modalRef)
  useEffect(() => {
    modalRef.current = 1
  }, [])
  return (
    // FIXME: adicionar mia um state
    <div
      data-open={isOpen}
      data-leave={isLeave}
      data-modal={modalRef.current}
      onAnimationEnd={(e) => {
        modalRef.current = 2
        onAnimationEnd(e)
      }}
      className="data-[modal='2']:scale-100 data-[modal='2']:opacity-100 bg-slate-50 max-w-448 w-full pb-4 p-6 rounded-2xl border-x border-y scale-0 opacity-0 border-slate-200 shadow-modal data-[modal='1']:data-[leave='false']:data-[open='true']:animate-fade-in data-[leave='true']:data-[leave='true']:animate-fade-out"
    >
      {children}
    </div>
  )
}
