import { Either, left, right } from '@/core/types/either'
import { ICandidaturesRepository } from '../../repositories/candidatures-repository'
import { inject, injectable } from 'tsyringe'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'

type GetCandidatureRequest = {
  opportunityId: string
  userId: string
}

type GetCandidatureResponse = Either<
  ResourceNotFoundError,
  {
    isCandidate: boolean
  }
>

@injectable()
export class GetCandidatureUseCase {
  constructor(
    @inject('CandidatureRepository')
    private candidaturesRepository: ICandidaturesRepository,
  ) {}

  async execute({
    userId,
    opportunityId,
  }: GetCandidatureRequest): Promise<GetCandidatureResponse> {
    const candidature =
      await this.candidaturesRepository.findByUserIdAndOpportunityId({
        opportunityId,
        userId,
      })

    if (!candidature) {
      return left(new ResourceNotFoundError())
    }

    const isCandidate = !!candidature

    return right({
      isCandidate,
    })
  }
}
