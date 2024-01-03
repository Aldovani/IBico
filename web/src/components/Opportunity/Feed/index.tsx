'use client'
import { OpportunityList } from '../List'
import { Pagination } from '../../Pagination'
import { OpportunityHeader } from '../Header'
import { useOpportunitiesFeed } from '@/contexts/OpportunitiesFeedContext'
import { EmptyList } from '../List/emptyList'

export function OpportunitiesFeed() {
  const {
    currentPage,
    totalElements,
    totalPages,
    handleSetCurrentPage,
    isLoading,
    isEmpty,
  } = useOpportunitiesFeed()

  return (
    <section className="mt-12 pb-16">
      <OpportunityHeader />
      <OpportunityList />
      {(isLoading || !isEmpty) && (
        <Pagination
          pageSize={12}
          currentPage={currentPage}
          totalElements={totalElements}
          totalPages={totalPages}
          onChangePage={handleSetCurrentPage}
        />
      )}

      {!isLoading && isEmpty && <EmptyList />}
    </section>
  )
}
