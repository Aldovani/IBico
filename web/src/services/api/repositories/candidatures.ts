import { AxiosInstance, AxiosResponse } from 'axios'
import { api } from '../index'
export type Candidature = {
  id: string
  opportunityId: string
  opportunity: {
    amount: number
    description: string
    title: string
    author: {
      name: string
      username: string
      avatar: string
    }
  }
}

type getCandidaturesResponse = {
  data: Candidature[]
  pageNo: number
  pageSize: number
  total: number
  totalPages: number
  last: true
}

type GetCandidatures = {
  status: 'CREATED' | 'PENDING' | 'CLOSED'
  page: number
}

type Candidate = {
  id: string
  avatar: string
  username: string
  name: string
  rating: number
}

export type GetCandidatesResponse = {
  data: Candidate[]
  pageNo: number
  pageSize: number
  totalElements: number
  totalPages: number
  last: boolean
  self: boolean
}

export function CandidatureRequest(httpProvider: AxiosInstance) {
  async function getCandidatures({ page, status }: GetCandidatures) {
    const { data } = await httpProvider.get<
      unknown,
      AxiosResponse<getCandidaturesResponse>
    >('/candidatures', {
      params: {
        status,
        page,
      },
    })
    return data
  }
  async function unsubscribeCandidature(id: string) {
    const { data } = await httpProvider.delete(`/candidatures/${id}`)

    return data
  }

  async function applyCandidature(id: string) {
    const { data } = await httpProvider.post(`/candidatures/${id}`)

    return data
  }

  async function fetchCandidates({
    opportunityId,
    page,
  }: {
    opportunityId: string
    page: number
  }) {
    const { data } = await httpProvider.get<
      unknown,
      AxiosResponse<GetCandidatesResponse>
    >(`/candidatures/${opportunityId}/candidates`, {
      params: {
        page,
      },
    })
    return data
  }

  return {
    getCandidatures,
    fetchCandidates,
    applyCandidature,
    unsubscribeCandidature,
  }
}

export const CandidatureRepository = CandidatureRequest(api)
