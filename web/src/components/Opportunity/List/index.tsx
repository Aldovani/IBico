'use client'

import { OpportunityItem } from '../Item'
import { useOpportunitiesFeed } from '@/contexts/OpportunitiesFeedContext'
import { OpportunitiesListLoading } from './listLoading'

export function OpportunityList() {
  const { isLoading, opportunities } = useOpportunitiesFeed()

  return (
    <ul className="grid grid-flow-row  grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5 mt-5">
      {isLoading && <OpportunitiesListLoading />}
      {!isLoading &&
        opportunities.map((item) => (
          <OpportunityItem key={item.id} data={item} />
        ))}
    </ul>
  )
}
