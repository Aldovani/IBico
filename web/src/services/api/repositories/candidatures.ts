import { AxiosInstance, AxiosResponse } from 'axios'
import { clientApi } from '../providers/clientSide'
export type Candidacy = {
  id: string
  candidatureDate: string
  candidateName: string
  candidateUsername: string
  candidateImgURL: string
  opportunityId: string
}

type getCandidaturesResponse = {
  items: Candidacy[]
  pageNo: number
  pageSize: number
  totalElements: number
  totalPages: number
  last: true
  self: true
}

export function CandidacyRequest(httpProvider: AxiosInstance) {
  async function getCandidatures() {
    const { data } = await httpProvider.get<
      unknown,
      AxiosResponse<getCandidaturesResponse>
    >('/candidatures')
    return data
  }
  async function unsubscribeCandidature(id: string) {
    const { data } = await httpProvider.delete(`/candidatures/${id}`)

    return data
  }

  async function applyCandidature(id: string) {
    const { data } = await httpProvider.post(
      '/candidatures',
      {},
      {
        params: {
          opportunityId: id,
        },
      },
    )

    return data
  }

  return {
    getCandidatures,
    applyCandidature,
    unsubscribeCandidature,
  }
}

export const Candidacy = CandidacyRequest(clientApi)
