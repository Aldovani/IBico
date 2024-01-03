import { Either, left, right } from '@/core/types/either'
import { ICandidaturesRepository } from '../../repositories/candidatures-repository'
import { IOpportunitiesRepository } from '../../repositories/opportunities-repository'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/erros/not-allowed-error'
import { inject, injectable } from 'tsyringe'
import { Candidate } from '@/domain/portal/enterprise/entities/candidate'

type FetchCandidatesRequest = {
  opportunityId: string
  userId: string
  page: number
  perPage: number
}

type FetchCandidatesResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    candidates: Candidate[]
    totalElements: number
    totalPages: number
    isLast: boolean
  }
>

@injectable()
export class FetchCandidatesUseCase {
  constructor(
    @inject('CandidatureRepository')
    private candidaturesRepository: ICandidaturesRepository,
    @inject('OpportunityRepository')
    private opportunityRepository: IOpportunitiesRepository,
  ) {}

  async execute({
    page,
    opportunityId,
    perPage,
    userId,
  }: FetchCandidatesRequest): Promise<FetchCandidatesResponse> {
    const opportunity = await this.opportunityRepository.findById(opportunityId)

    if (!opportunity) {
      return left(new ResourceNotFoundError())
    }

    const isAuthor = userId === opportunity.authorId.toString()

    if (!isAuthor) {
      return left(new NotAllowedError())
    }

    const { candidates, total } =
      await this.candidaturesRepository.findManyByOpportunityId(opportunityId, {
        page,
        perPage,
      })

    const totalPages = Math.ceil(total / perPage)

    const isLast = page >= totalPages

    return right({
      candidates,
      isLast,
      totalElements: total,
      totalPages,
    })
  }
}
