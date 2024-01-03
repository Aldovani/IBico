import { IOpportunitiesRepository } from '@/domain/portal/application/repositories/opportunities-repository'
import { Either, left, right } from '@/core/types/either'
import { ICandidaturesRepository } from '../../repositories/candidatures-repository'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/erros/not-allowed-error'
import { Candidature } from '@/domain/portal/enterprise/entities/candidature'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { OpportunityClosedError } from './errors/opportunity-closed-error'
import { inject, injectable } from 'tsyringe'

type CreateCandidatureRequest = {
  opportunityId: string
  userId: string
}

type CreateCandidatureResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  {
    candidature: Candidature
  }
>

@injectable()
export class CreateCandidatureUseCase {
  constructor(
    @inject('OpportunityRepository')
    private opportunityRepository: IOpportunitiesRepository,
    @inject('CandidatureRepository')
    private candidaturesRepository: ICandidaturesRepository,
  ) {}

  async execute({
    opportunityId,
    userId,
  }: CreateCandidatureRequest): Promise<CreateCandidatureResponse> {
    const opportunity = await this.opportunityRepository.findById(opportunityId)

    if (!opportunity) {
      return left(new ResourceNotFoundError())
    }

    if (opportunity.status !== 'CREATED') {
      return left(new OpportunityClosedError(opportunityId))
    }

    const isAuthor = userId === opportunity.authorId.toString()

    if (isAuthor) {
      return left(new NotAllowedError())
    }

    const isAlreadyACandidate =
      await this.candidaturesRepository.findByUserIdAndOpportunityId({
        opportunityId,
        userId,
      })

    if (isAlreadyACandidate) {
      return left(new NotAllowedError())
    }

    const candidature = Candidature.create({
      opportunityId: new UniqueEntityId(opportunityId),
      userId: new UniqueEntityId(userId),
    })

    await this.candidaturesRepository.create(candidature)

    return right({
      candidature,
    })
  }
}
