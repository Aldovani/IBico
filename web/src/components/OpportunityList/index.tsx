import { serverApi } from '@/services/api'
import { GetOpportunitiesResponse } from '@/services/api/repositories/opportunity'
import { AxiosResponse } from 'axios'
import { OpportunityProvider } from '@/contexts/opportunityContext'
import { ContainerOpportunity } from './Container'
import { ModalOpportunity } from './ModalOpportunity'
import { DrawerOpportunity } from './DrawerOpportunity'

export async function OpportunityList() {
  const {
    data: { items },
  } = await serverApi.get<any, AxiosResponse<GetOpportunitiesResponse>>(
    '/oportunities',
  )

  return (
    <OpportunityProvider>
      <ContainerOpportunity opportunities={items} />
      <ModalOpportunity />
      <DrawerOpportunity />
    </OpportunityProvider>
  )
}
