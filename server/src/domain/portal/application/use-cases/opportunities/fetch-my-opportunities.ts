import { Opportunity } from '@/domain/portal/enterprise/entities/opportunity'
import { IOpportunitiesRepository } from '@/domain/portal/application/repositories/opportunities-repository'
import { Either, right } from '@/core/types/either'
import { inject, injectable } from 'tsyringe'

type FetchMeOpportunityRequest = {
  userId: string
  page: number
  perPage: number
  status: 'CREATED' | 'PENDING' | 'CLOSED' | 'DISABLED'
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
export class FetchMyOpportunityUseCase {
  constructor(
    @inject('OpportunityRepository')
    private opportunityRepository: IOpportunitiesRepository,
  ) {}

  async execute({
    userId,
    page,
    perPage,
    status,
  }: FetchMeOpportunityRequest): Promise<FetchMeOpportunityResponse> {
    const { opportunities, total } =
      await this.opportunityRepository.findManyByUserId(
        { userId, status },
        {
          page,
          perPage,
        },
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
