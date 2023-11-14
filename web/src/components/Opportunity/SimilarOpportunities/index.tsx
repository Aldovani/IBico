import { serverApi } from '@/services/api'
import { GetOpportunitiesResponse } from '@/services/api/repositories/opportunity'
import { AxiosResponse } from 'axios'
import { OpportunityItem } from '../Item'

async function getSimilarOpportunities() {
  try {
    const { data } = await serverApi.get<
      unknown,
      AxiosResponse<GetOpportunitiesResponse>
    >('/opportunities?pageSize=5')
    return data
  } catch (err) {
    return null
  }
}

export async function SimilarOpportunities() {
  const data = await getSimilarOpportunities()
  if (!data) return null
  const opportunities = data.items

  return (
    <div className="flex flex-col max-lg:flex-wrap justify-between gap-4 mt-4 ">
      {opportunities.map((opportunity) => (
        <OpportunityItem key={opportunity.id} data={opportunity} />
      ))}
    </div>
  )
}
