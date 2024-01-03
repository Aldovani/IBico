import { useMemo } from 'react'

type usePaginationProps = {
  totalCount: number
  pageSize: number
  siblingCount: number
  currentPage: number
  onChangePage: (page: number) => void
}

function getPaginationRange(start: number, end: number) {
  const length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}

export function usePagination({
  totalCount,
  pageSize,
  siblingCount = 1,
  onChangePage,
}: usePaginationProps) {
  function handlePreviousPage(page: number) {
    onChangePage(page)
  }

  function handleNextPage(page: number) {
    onChangePage(page)
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
    handlePreviousPage,
  }
}
