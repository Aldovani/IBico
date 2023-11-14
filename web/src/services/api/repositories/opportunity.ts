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

type createOpportunityPayload = Omit<
  Opportunity,
  'id' | 'postedBy' | 'createdAt' | 'status'
>
type UpdateOpportunityPayload = Omit<
  Opportunity,
  'postedBy' | 'createdAt' | 'status'
> & { id?: string }

export type Candidate = {
  id: string
  candidatureDate: string
  candidateName: string
  candidateUsername: string
  candidateImgURL: string
  opportunityId: string
}

export type GetCandidatesResponse = {
  items: Candidate[]
  pageNo: number
  pageSize: number
  totalElements: number
  totalPages: number
  last: boolean
  self: boolean
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

type GetOpportunitiesOptions = {
  pageNo?: number
  pageSize?: number
  sortBy?: keyof Opportunity
  sortDir?: 'ASC' | 'DESC'
  query?: string
}

type selectCandidatePayload = {
  username: string
  opportunityId: string
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
      endDateTime,
      local,
      necessarySkills,
      startDateTime,
      status: 'CREATED',
      timeLoad,
      title,
      value,
    }

    const { data } = await httpProvider.post(
      '/opportunities',
      opportunityPayload,
    )

    return data
  }

  async function getOpportunities({
    pageNo = 0,
    pageSize = 12,
    sortBy = 'id',
    sortDir = 'ASC',
    query = '',
  }: GetOpportunitiesOptions) {
    const { data } = await httpProvider.get<
      unknown,
      AxiosResponse<GetOpportunitiesResponse>
    >('/opportunities', {
      params: { pageNo, pageSize, sortBy, sortDir, query },
    })
    return data
  }

  async function getMeOpportunities() {
    const { data } = await httpProvider.get<
      unknown,
      AxiosResponse<GetOpportunitiesResponse>
    >('/users/opportunites')
    return data
  }

  async function getOpportunityById(id: string) {
    const { data } = await httpProvider.get(`/opportunities/${id}`)
    return data
  }

  async function deleteOpportunity(id: string) {
    await httpProvider.delete(`/opportunities/${id}`)
  }

  async function updateOpportunity(payload: UpdateOpportunityPayload) {
    const opportunityPayload = { ...payload, status: 'CREATED' }

    const { data } = await httpProvider.put(
      `/opportunities/${payload.id}`,
      opportunityPayload,
    )
    return data
  }
  async function selectCandidate({
    opportunityId,
    username,
  }: selectCandidatePayload) {
    const { data } = await httpProvider.post(
      `opportunities/${opportunityId}/candidates/${username}`,
    )
    return data
  }

  async function getCandidates(id: string) {
    const { data } = await httpProvider.get<
      unknown,
      AxiosResponse<GetCandidatesResponse>
    >(`/opportunities/${id}/candidates`)
    return data
  }
  return {
    createOpportunity,
    getOpportunities,
    deleteOpportunity,
    updateOpportunity,
    getOpportunityById,
    getCandidates,
    getMeOpportunities,
    selectCandidate,
  }
}

export const Opportunity = OpportunityRequest(clientApi)
