import { useOpportunitiesFeed } from '@/contexts/OpportunitiesFeedContext'
import { useMemo } from 'react'

type usePaginationProps = {
  totalCount: number
  pageSize: number
  siblingCount: number
  currentPage: number
}

function getPaginationRange(start: number, end: number) {
  const length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}

export function usePagination({
  totalCount,
  pageSize,
  siblingCount = 1,
}: usePaginationProps) {
  const { fetchOpportunities, handleSetCurrentPage } = useOpportunitiesFeed()
  function handleNextPage(page: number) {
    handleSetCurrentPage(page)
    fetchOpportunities()
  }

  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize)
    const totalPageNumbers = siblingCount + 5
    if (totalPageNumbers >= totalPageCount) {
      return getPaginationRange(1, totalPageCount)
    }
  }, [totalCount, pageSize, siblingCount])

  return {
    paginationRange,
    handleNextPage,
  }
}
