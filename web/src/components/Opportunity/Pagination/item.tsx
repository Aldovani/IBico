import { useOpportunitiesFeed } from '@/contexts/OpportunitiesFeedContext'
import { ReactNode } from 'react'

type PaginationItemProps = {
  active: boolean
  children: ReactNode
}
export function PaginationItem({ active, children }: PaginationItemProps) {
  const { handleSetCurrentPage, fetchOpportunities } = useOpportunitiesFeed()

  function handleClick() {
    handleSetCurrentPage(Number(children) - 1)
    fetchOpportunities()
  }

  return (
    <li
      data-active={active}
      onClick={handleClick}
      className=" font-poppins text-sm  data-[active='true']:border-blue-500  data-[active='true']:text-blue-700 data-[active='true']:bg-blue-50 border-slate-200  text-slate-500 rounded-lg font-medium h-8 w-8 border-x border-y  flex items-center justify-center"
    >
      {children}
    </li>
  )
}
