'use client'
import { Opportunity } from '@/services/api/repositories/opportunity'
import { useQuery } from '@tanstack/react-query'
import { ReactNode, createContext, useContext, useState } from 'react'

type OpportunitiesFeedContextProps = {
  opportunities: Opportunity[]
  isLoading: boolean
  sortDir: 'ASC' | 'DESC'
  totalElements: number
  currentPage: number
  fetchOpportunities: () => void
  handleSetSortDir: (data: 'ASC' | 'DESC') => void
  handleSetCurrentPage: (page: number) => void
  handleChangeLocalSearch: (value: string) => void
  handleChangeTitleSearch: (value: string) => void
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
  const [sortBy, setSortBy] = useState<keyof Opportunity>('createdAt')
  const [currentPage, setCurrentPage] = useState(0)
  const [title, setTitle] = useState('')
  const [local, setLocal] = useState('')
  const [totalElements, setTotalElements] = useState(0)

  const { isLoading, refetch } = useQuery({
    queryKey: ['OPPORTUNITIES_FEED', currentPage, sortDir, sortBy],
    queryFn: () =>
      Opportunity.getOpportunities({
        sortDir,
        pageNo: currentPage,
        sortBy,
        query: title ?? undefined,
      }),
    onSuccess: (data) => {
      setOpportunities(data.items)
      setTotalElements(data.totalElements)
    },
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
    setTitle(value)
  }

  function fetchOpportunities() {
    refetch()
  }

  return (
    <OpportunitiesFeedContext.Provider
      value={{
        opportunities,
        isLoading,
        totalElements,
        currentPage,
        handleSetSortDir,
        fetchOpportunities,
        handleSetCurrentPage,
        sortDir,
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
