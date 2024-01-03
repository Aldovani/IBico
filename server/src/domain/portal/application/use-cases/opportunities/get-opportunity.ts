import { Opportunity } from '@/domain/portal/enterprise/entities/opportunity'
import { IOpportunitiesRepository } from '@/domain/portal/application/repositories/opportunities-repository'
import { Either, left, right } from '@/core/types/either'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { inject, injectable } from 'tsyringe'

type GetOpportunityRequest = {
  opportunityId: string
}

type GetOpportunityResponse = Either<
  ResourceNotFoundError,
  {
    opportunity: Opportunity
  }
>

@injectable()
export class GetOpportunityUseCase {
  constructor(
    @inject('OpportunityRepository')
    private opportunityRepository: IOpportunitiesRepository,
  ) {}

  async execute({
    opportunityId,
  }: GetOpportunityRequest): Promise<GetOpportunityResponse> {
    const opportunity = await this.opportunityRepository.findById(opportunityId)

    if (!opportunity) {
      return left(new ResourceNotFoundError())
    }

    return right({
      opportunity,
    })
  }
}
