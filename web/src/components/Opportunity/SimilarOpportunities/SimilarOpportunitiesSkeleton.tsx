import { OpportunityItemSkeleton } from '../Item/skeleton'

export function SimilarOpportunitiesSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <OpportunityItemSkeleton />
      <OpportunityItemSkeleton />
      <OpportunityItemSkeleton />
      <OpportunityItemSkeleton />
      <OpportunityItemSkeleton />
    </div>
  )
}
