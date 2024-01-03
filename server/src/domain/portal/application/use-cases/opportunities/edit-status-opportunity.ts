import { NotAllowedError } from '@/core/errors/erros/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { Either, left, right } from '@/core/types/either'
import { IOpportunitiesRepository } from '@/domain/portal/application/repositories/opportunities-repository'
import { Opportunity } from '@/domain/portal/enterprise/entities/opportunity'
import { inject, injectable } from 'tsyringe'

type EditOpportunityPayload = 'CREATED' | 'PENDING' | 'CLOSED' | 'DISABLED'

type EditStatusOpportunityRequest = {
  status: EditOpportunityPayload
  opportunityId: string
  userId: string
}

type EditStatusOpportunityResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { opportunity: Opportunity }
>

@injectable()
export class EditStatusOpportunityUseCase {
  constructor(
    @inject('OpportunityRepository')
    private opportunityRepository: IOpportunitiesRepository,
  ) {}

  async execute({
    status,
    userId,
    opportunityId,
  }: EditStatusOpportunityRequest): Promise<EditStatusOpportunityResponse> {
    const opportunity = await this.opportunityRepository.findById(opportunityId)

    if (!opportunity) {
      return left(new ResourceNotFoundError())
    }

    const isOwner = opportunity.authorId.toValue() === userId

    if (!isOwner) {
      return left(new NotAllowedError())
    }

    opportunity.status = status

    await this.opportunityRepository.save(opportunity)

    return right({
      opportunity,
    })
  }
}
