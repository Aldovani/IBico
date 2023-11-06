import { OpportunityItem } from '../Item'

type Opportunity = {
  title: string
  description: string
  id: string
  time: string
  value: string
  author: string
}

type OpportunityLisProps = {
  opportunities: Opportunity[]
}

export function OpportunityList({ opportunities }: OpportunityLisProps) {
  return (
    <div className="grid grid-flow-row  grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5 mt-5">
      {opportunities.map((item) => (
        <OpportunityItem key={item.id} data={item} />
      ))}
    </div>
  )
}
