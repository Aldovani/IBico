import { Either, right } from '@/core/types/either'
import { ICandidaturesRepository } from '../../repositories/candidatures-repository'
import { inject, injectable } from 'tsyringe'

type GetCandidatureRequest = {
  opportunityId: string
  userId: string
}

type GetCandidatureResponse = Either<
  null,
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

    const isCandidate = !!candidature

    return right({
      isCandidate,
    })
  }
}
