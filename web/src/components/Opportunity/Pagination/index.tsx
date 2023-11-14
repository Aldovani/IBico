'use client'

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { usePagination } from './usePagination'
import { PaginationItem } from './item'
import { useOpportunitiesFeed } from '@/contexts/OpportunitiesFeedContext'

export function Pagination() {
  const { currentPage, totalElements } = useOpportunitiesFeed()

  const { paginationRange } = usePagination({
    currentPage,
    pageSize: 12,
    siblingCount: 4,
    totalCount: totalElements,
  })
  return (
    <footer className="flex justify-end items-center gap-2 mt-5">
      <div className="rounded-lg h-8 w-8 border-x border-y border-slate-200 flex items-center justify-center">
        <FiChevronLeft size="16" color="#64748B" />
      </div>

      {paginationRange?.map((item) => (
        <PaginationItem key={item} active={currentPage + 1 === item}>
          {item}
        </PaginationItem>
      ))}

      <div className="rounded-lg h-8 w-8 border-x border-y border-slate-200 flex items-center justify-center">
        <FiChevronRight size="16" color="#64748B" />
      </div>
    </footer>
  )
}
