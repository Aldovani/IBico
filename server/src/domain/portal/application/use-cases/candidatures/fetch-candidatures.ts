import { Either, right } from '@/core/types/either'
import { ICandidaturesRepository } from '../../repositories/candidatures-repository'
import { Candidature } from '@/domain/portal/enterprise/entities/candidature'
import { inject, injectable } from 'tsyringe'

type FetchCandidaturesRequest = {
  userId: string
  page: number
  perPage: number
  status: 'CREATED' | 'PENDING' | 'CLOSED'
}

type FetchCandidaturesResponse = Either<
  null,
  {
    candidatures: Candidature[]
    totalElements: number
    totalPages: number
    isLast: boolean
  }
>

@injectable()
export class FetchCandidaturesUseCase {
  constructor(
    @inject('CandidatureRepository')
    private candidaturesRepository: ICandidaturesRepository,
  ) {}

  async execute({
    userId,
    page,
    perPage,
    status,
  }: FetchCandidaturesRequest): Promise<FetchCandidaturesResponse> {
    const { candidatures, total } =
      await this.candidaturesRepository.findManyByUserId(
        { userId, status },
        {
          page,
          perPage,
        },
      )

    const totalPages = Math.ceil(total / perPage)

    const isLast = page >= totalPages

    return right({
      candidatures,
      isLast,
      totalElements: total,
      totalPages,
    })
  }
}
