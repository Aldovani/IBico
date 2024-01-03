import {
  Opportunity,
  OpportunityStatus,
} from '@/domain/portal/enterprise/entities/opportunity'
import { IOpportunitiesRepository } from '@/domain/portal/application/repositories/opportunities-repository'
import { Either, right } from '@/core/types/either'
import { inject, injectable } from 'tsyringe'

type FetchOpportunityRequest = {
  page: number
  perPage: number
  title?: string
  local?: string
  amount?: number
  status?: OpportunityStatus
}

type FetchMeOpportunityResponse = Either<
  null,
  {
    opportunities: Opportunity[]
    totalElements: number
    totalPages: number
    isLast: boolean
  }
>
@injectable()
export class FetchOpportunityUseCase {
  constructor(
    @inject('OpportunityRepository')
    private opportunityRepository: IOpportunitiesRepository,
  ) {}

  async execute({
    amount,
    local,
    title,
    page,
    status,
    perPage,
  }: FetchOpportunityRequest): Promise<FetchMeOpportunityResponse> {
    const { opportunities, total } = await this.opportunityRepository.findMany(
      { amount, local, title, status },
      { page, perPage },
    )

    const totalPages = Math.ceil(total / perPage)

    const isLast = page >= totalPages

    return right({
      opportunities,
      totalElements: total,
      totalPages,
      isLast,
    })
  }
}
