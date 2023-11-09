import { ReactNode } from 'react'
import { useDrawerComponent } from './context'

type ContainerProps = {
  children: ReactNode
}
export function Container({ children }: ContainerProps) {
  const { isOpen } = useDrawerComponent()

  return (
    <aside
      data-open={isOpen}
      className="rounded-l-lg px-4 py-6 w-1/4 h-full bg-slate-50 absolute 
      right-0 border-l border-slate-200  translate-x-full 
      transition-all 
      delay-0 opacity-0
      data-[open='true']:translate-x-0 data-[open='true']:opacity-100  
      data-[open='true']:delay-200 
      overflow-y-scroll
      "
    >
      {children}
    </aside>
  )
}
