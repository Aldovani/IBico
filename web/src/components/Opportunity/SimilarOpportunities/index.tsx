import { api } from '@/services/api'
import { GetOpportunitiesResponse } from '@/services/api/repositories/opportunity'
import { AxiosResponse } from 'axios'
import { cookies } from 'next/headers'
import { OpportunityItem } from '../Item'

async function getSimilarOpportunities() {
  try {
    const { data } = await api.get<
      unknown,
      AxiosResponse<GetOpportunitiesResponse>
    >('/opportunities?perPage=5', {
      headers: { cookie: cookies().toString() },
    })
    return data
  } catch (err) {
    return null
  }
}

export async function SimilarOpportunities() {
  const data = await getSimilarOpportunities()
  if (!data) return null
  const opportunities = data.data

  return (
    <div className="flex flex-col max-lg:flex-wrap justify-between gap-4 mt-4 ">
      {opportunities.map((opportunity) => (
        <OpportunityItem key={opportunity.id} data={opportunity} />
      ))}
    </div>
  )
}
