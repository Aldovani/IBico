import { OpportunityListItem } from './item'
import { Opportunity } from '@/services/api/repositories/opportunity'

type ContainerOpportunityProps = {
  opportunities: Opportunity[]
}

export async function ContainerOpportunity({
  opportunities,
}: ContainerOpportunityProps) {
  return (
    <ul className="[&>*:not(:first-child)]:mt-3">
      {opportunities.map((opportunity) => (
        <OpportunityListItem key={opportunity.id} data={opportunity} />
      ))}
    </ul>
  )
}
