import { ReactNode } from 'react'

type PaginationItemProps = {
  active: boolean
  children: ReactNode
  onClick: () => void
}
export function PaginationItem({
  active,
  children,
  onClick,
}: PaginationItemProps) {
  return (
    <button
      data-active={active}
      onClick={onClick}
      className=" font-poppins text-sm  data-[active='true']:border-blue-900  data-[active='true']:text-blue-900 data-[active='true']:bg-blue-900/10 border-slate-200  text-slate-500 rounded-lg font-medium h-8 w-8 border-x border-y  flex items-center justify-center"
    >
      {children}
    </button>
  )
}
