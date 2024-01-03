'use client'
import { useOpportunitiesFeed } from '@/contexts/OpportunitiesFeedContext'

export function OpportunityHeader() {
  const { totalElements, sortDir, handleSetSortDir, fetchOpportunities } =
    useOpportunitiesFeed()

  function handleClick() {
    handleSetSortDir(sortDir === 'ASC' ? 'DESC' : 'ASC')
    fetchOpportunities()
  }
  return (
    <header className="flex items-center justify-between">
      <p className="text-slate-500 text-base font-poppins">
        Oportunidades encontradas{' '}
        <strong className="text-blue-900">
          {totalElements?.toString().padStart(0, '0') || '00'}
        </strong>
      </p>

      <p
        onClick={handleClick}
        className="text-slate-500 text-base  font-poppins"
      >
        ordem <strong>Alfabética</strong>{' '}
        <strong className="text-blue-900">
          {sortDir === 'ASC' ? 'A-Z' : 'Z-A'}
        </strong>
      </p>
    </header>
  )
}
