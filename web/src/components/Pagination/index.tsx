'use client'

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { usePagination } from './usePagination'
import { PaginationItem } from './item'

type PaginationProps = {
  currentPage: number
  totalElements: number
  totalPages: number
  pageSize: number
  onChangePage: (page: number) => void
}

export function Pagination({
  currentPage,
  totalElements,
  totalPages,
  onChangePage,
  pageSize = 12,
}: PaginationProps) {
  const { paginationRange, handleNextPage, handlePreviousPage } = usePagination(
    {
      currentPage,
      pageSize,
      siblingCount: 4,
      totalCount: totalElements,
      onChangePage,
    },
  )
  return (
    <footer className="flex justify-end items-center gap-2 mt-5">
      <button
        onClick={() => handlePreviousPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-lg h-8 w-8 border-x border-y border-slate-200 flex items-center justify-center disabled:opacity-30"
      >
        <FiChevronLeft size="16" color="#64748B" />
      </button>

      {paginationRange?.map((item) => (
        <PaginationItem
          key={item}
          onClick={() => onChangePage(item)}
          active={currentPage === item}
        >
          {item}
        </PaginationItem>
      ))}

      <button
        onClick={() => handleNextPage(currentPage + 1)}
        disabled={totalPages === currentPage}
        className="rounded-lg h-8 w-8 border-x border-y border-slate-200 flex items-center justify-center disabled:opacity-30"
      >
        <FiChevronRight size="16" color="#64748B" />
      </button>
    </footer>
  )
}
