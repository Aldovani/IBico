import { AnimationEvent, ReactNode } from 'react'

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
  return (
    <div
      data-open={isOpen}
      data-leave={isLeave}
      onAnimationEnd={onAnimationEnd}
      className="bg-slate-50 max-w-448 w-full pb-4 p-6 rounded-2xl border-x border-y scale-0 opacity-0 border-slate-200 shadow-modal data-[leave='false']:data-[open='true']:animate-fade-in data-[leave='true']:data-[leave='true']:animate-fade-out"
    >
      {children}
    </div>
  )
}
