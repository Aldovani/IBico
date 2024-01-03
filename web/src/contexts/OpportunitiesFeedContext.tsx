'use client'
import { useDebounce } from '@/hooks/useDebounce'
import {
  Opportunity,
  opportunity,
} from '@/services/api/repositories/opportunity'
import { useQuery } from '@tanstack/react-query'
import { ReactNode, createContext, useContext, useState } from 'react'

type OpportunitiesFeedContextProps = {
  opportunities: Opportunity[]
  isLoading: boolean
  isEmpty: boolean
  sortDir: 'ASC' | 'DESC'
  totalElements: number
  totalPages: number
  currentPage: number
  title: string
  local: string
  fetchOpportunities: () => void
  handleSetSortDir: (data: 'ASC' | 'DESC') => void
  handleSetCurrentPage: (page: number) => void
  handleChangeLocalSearch: (value: string) => void
  handleChangeTitleSearch: (value: string) => void
  handleClearFilter: () => void
}
type OpportunitiesFeedProviderProps = {
  children: ReactNode
}

const OpportunitiesFeedContext = createContext(
  {} as OpportunitiesFeedContextProps,
)

export function OpportunitiesFeedProvider({
  children,
}: OpportunitiesFeedProviderProps) {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [sortDir, setSortDir] = useState<'ASC' | 'DESC'>('ASC')
  const [sortBy] = useState<keyof Opportunity>('createdAt')
  const [currentPage, setCurrentPage] = useState(1)
  const [title, setTitle] = useState('')
  const [local, setLocal] = useState('')
  const [totalElements, setTotalElements] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const titleWithDebounce = useDebounce<string>(title, 500)
  const localWithDebounce = useDebounce<string>(local, 500)
  const isEmpty = opportunities.length === 0
  const { isLoading, refetch } = useQuery({
    queryKey: [
      'OPPORTUNITIES_FEED',
      currentPage,
      sortDir,
      sortBy,
      titleWithDebounce,
      localWithDebounce,
    ],
    queryFn: () =>
      opportunity.getOpportunities({
        sortDir,
        pageNo: currentPage,
        sortBy,
        title: titleWithDebounce,
        local: localWithDebounce,
      }),
    onSuccess: ({ data, totalElements, totalPages }) => {
      setOpportunities(data)
      setTotalElements(totalElements)
      setTotalPages(totalPages)
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    // cacheTime: 0,
  })

  function handleSetSortDir(data: 'ASC' | 'DESC') {
    setSortDir(data)
  }
  function handleSetCurrentPage(page: number) {
    setCurrentPage(page)
  }
  function handleChangeTitleSearch(value: string) {
    setTitle(value)
  }
  function handleChangeLocalSearch(value: string) {
    setLocal(value)
  }

  function handleClearFilter() {
    setCurrentPage(1)
    setTitle('')
    setLocal('')
  }
  function fetchOpportunities() {
    refetch()
  }

  return (
    <OpportunitiesFeedContext.Provider
      value={{
        isEmpty,
        title,
        local,
        totalPages,
        opportunities,
        isLoading,
        totalElements,
        currentPage,
        handleSetSortDir,
        fetchOpportunities,
        handleSetCurrentPage,
        sortDir,
        handleClearFilter,
        handleChangeLocalSearch,
        handleChangeTitleSearch,
      }}
    >
      {children}
    </OpportunitiesFeedContext.Provider>
  )
}

export function useOpportunitiesFeed() {
  const data = useContext(OpportunitiesFeedContext)
  return data
}
