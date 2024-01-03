import { IOpportunitiesRepository } from '@/domain/portal/application/repositories/opportunities-repository'
import { Either, left, right } from '@/core/types/either'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/erros/not-allowed-error'
import { inject, injectable } from 'tsyringe'

type DeleteOpportunityRequest = {
  opportunityId: string
  userId: string
}

type DeleteOpportunityResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

@injectable()
export class DeleteOpportunityUseCase {
  constructor(
    @inject('OpportunityRepository')
    private opportunityRepository: IOpportunitiesRepository,
  ) {}

  async execute({
    opportunityId,
    userId,
  }: DeleteOpportunityRequest): Promise<DeleteOpportunityResponse> {
    const opportunity = await this.opportunityRepository.findById(opportunityId)

    if (!opportunity) {
      return left(new ResourceNotFoundError())
    }

    const isAuthor = opportunity.authorId.toString() !== userId

    if (isAuthor) {
      return left(new NotAllowedError())
    }

    await this.opportunityRepository.delete(opportunity)

    return right(null)
  }
}
