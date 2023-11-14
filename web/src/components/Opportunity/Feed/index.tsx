import { OpportunityList } from '../List'
import { Pagination } from '../Pagination'
import { OpportunityHeader } from '../Header'

export function OpportunitiesFeed() {
  return (
    <section className="mt-12 pb-16">
      <OpportunityHeader />
      <OpportunityList />
      <Pagination />
    </section>
  )
}
