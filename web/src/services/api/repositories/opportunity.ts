import { Skills } from '@/components/Skills/SkillsList'
import { AxiosInstance, AxiosResponse } from 'axios'
import { clientApi } from '../providers/clientSide'

export type Opportunity = {
  id: string
  title: string
  description: string
  startDateTime: string
  endDateTime: string
  timeLoad: string
  local: string
  value: number
  necessarySkills: Skills[]
  status: string
  createdAt: string
  postedBy: {
    name: string
    username: string
    imgURL: string
  }
}

type createOpportunityPayload = {
  title: string
  description: string
  startDateTime: Date
  endDateTime: Date
  timeLoad: string
  local: string
  value: number
  necessarySkills: { name: string }[]
}

export type GetOpportunitiesResponse = {
  items: Opportunity[]
  pageNo: number
  pageSize: number
  totalElements: number
  totalPages: number
  last: boolean
  self: boolean
}

export function OpportunityRequest(httpProvider: AxiosInstance) {
  async function createOpportunity({
    description,
    endDateTime,
    local,
    necessarySkills,
    startDateTime,
    timeLoad,
    title,
    value,
  }: createOpportunityPayload) {
    const opportunityPayload = {
      description,
      endDateTime: endDateTime.toISOString(),
      local,
      necessarySkills,
      startDateTime: startDateTime.toISOString(),
      status: 'CREATED',
      timeLoad,
      title,
      value,
    }

    const { data } = await httpProvider.post(
      '/oportunities',
      opportunityPayload,
    )

    return data
  }

  async function getOpportunities() {
    const { data } = await httpProvider.get<
      any,
      AxiosResponse<GetOpportunitiesResponse>
    >('/oportunities')
    return data
  }

  async function deleteOpportunity(id: string) {
    console.log({ id })
    await httpProvider.delete(`/oportunities/${id}`)
  }

  return { createOpportunity, getOpportunities, deleteOpportunity }
}

export const Opportunity = OpportunityRequest(clientApi)
