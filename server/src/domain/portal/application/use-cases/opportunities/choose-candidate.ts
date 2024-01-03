import { IOpportunitiesRepository } from '@/domain/portal/application/repositories/opportunities-repository'
import { Either, left, right } from '@/core/types/either'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/erros/not-allowed-error'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { CandidateAlreadySelectedError } from './errors/candidate-already-selected-error'
import { inject, injectable } from 'tsyringe'
import { ICandidaturesRepository } from '../../repositories/candidatures-repository'

type ChooseCandidateOpportunityRequest = {
  candidateId: string
  opportunityId: string
}

type ChooseCandidateOpportunityResponse = Either<
  ResourceNotFoundError | NotAllowedError | CandidateAlreadySelectedError,
  null
>

@injectable()
export class ChooseCandidateOpportunityUseCase {
  constructor(
    @inject('OpportunityRepository')
    private opportunityRepository: IOpportunitiesRepository,
    @inject('CandidatureRepository')
    private candidatureRepository: ICandidaturesRepository,
  ) {}

  async execute({
    candidateId,
    opportunityId,
  }: ChooseCandidateOpportunityRequest): Promise<ChooseCandidateOpportunityResponse> {
    const opportunity = await this.opportunityRepository.findById(opportunityId)

    if (!opportunity) {
      return left(new ResourceNotFoundError())
    }

    if (opportunity.status !== 'CREATED') {
      return left(new CandidateAlreadySelectedError(opportunityId))
    }

    const isCandidate =
      await this.candidatureRepository.findByUserIdAndOpportunityId({
        opportunityId,
        userId: candidateId,
      })

    if (!isCandidate) {
      return left(new NotAllowedError())
    }

    opportunity.status = 'PENDING'
    opportunity.candidateId = new UniqueEntityId(candidateId)
    opportunity.opportunityClosedTime = new Date()

    await this.opportunityRepository.save(opportunity)

    return right(null)
  }
}
