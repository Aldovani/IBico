import { AxiosInstance, AxiosResponse } from 'axios'
import { api } from '../'

export type Opportunity = {
  id: string
  title: string
  description: string
  startDateTime: string
  endDateTime: string
  timeLoad: string
  local: string
  amount: number
  skills: string[]
  status: string
  createdAt: string
  postBy: {
    name: string
    username: string
    avatar: string
  }
}

type createOpportunityPayload = Omit<
  Opportunity,
  'id' | 'postBy' | 'createdAt' | 'status'
>
type UpdateOpportunityPayload = Omit<
  Opportunity,
  'postBy' | 'createdAt' | 'status'
> & { id?: string }

export type GetOpportunitiesResponse = {
  data: Opportunity[]
  totalElements: number
  totalPages: number
  isLast: boolean
}

type GetOpportunitiesOptions = {
  pageNo?: number
  pageSize?: number
  sortBy?: keyof Opportunity
  sortDir?: 'ASC' | 'DESC'
  local?: string
  title?: string
}

type selectCandidatePayload = {
  userId: string
  opportunityId: string
}
type OpportunityStatus = 'CREATED' | 'PENDING' | 'CLOSED' | 'DISABLED'

type GetMeOpportunitiesProps = {
  status: OpportunityStatus
  page: number
  perPage: number
}

type ChangeStatusProps = {
  opportunityId: string
  status: OpportunityStatus
}
export function OpportunityRequest(httpProvider: AxiosInstance) {
  async function createOpportunity({
    description,
    endDateTime,
    local,
    skills,
    startDateTime,
    timeLoad,
    title,
    amount,
  }: createOpportunityPayload) {
    const opportunityPayload = {
      description,
      endDateTime,
      local,
      skills,
      startDateTime,
      status: 'CREATED',
      timeLoad,
      title,
      amount,
    }

    const { data } = await httpProvider.post(
      '/opportunities',
      opportunityPayload,
    )

    return data
  }

  async function getOpportunities({
    pageNo = 1,
    pageSize = 12,
    local = '',
    title = '',
  }: GetOpportunitiesOptions) {
    const { data } = await httpProvider.get<
      unknown,
      AxiosResponse<GetOpportunitiesResponse>
    >('/opportunities', {
      params: { page: pageNo, perPage: pageSize, local, title },
    })
    return data
  }

  async function getMeOpportunities({
    status,
    page,
    perPage = 10,
  }: GetMeOpportunitiesProps) {
    const { data } = await httpProvider.get<
      unknown,
      AxiosResponse<GetOpportunitiesResponse>
    >('/opportunities/me', {
      params: {
        status,
        page,
        perPage,
      },
    })
    return {
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      data: data.data,
      isLast: data.isLast,
    }
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
    userId,
  }: selectCandidatePayload) {
    const { data } = await httpProvider.post(
      `opportunities/${opportunityId}/candidates/${userId}`,
    )
    return data
  }

  async function changeStatus({ opportunityId, status }: ChangeStatusProps) {
    const { data } = await httpProvider.put(
      `opportunities/${opportunityId}/${status}`,
    )
    return data
  }

  return {
    createOpportunity,
    getOpportunities,
    deleteOpportunity,
    updateOpportunity,
    getOpportunityById,
    changeStatus,
    getMeOpportunities,
    selectCandidate,
  }
}

export const opportunity = OpportunityRequest(api)
