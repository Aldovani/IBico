import { Either, left, right } from '@/core/types/either'
import { ICandidaturesRepository } from '../../repositories/candidatures-repository'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/erros/not-allowed-error'
import { inject, injectable } from 'tsyringe'

type DeleteCandidature = {
  candidatureId: string
  userId: string
}

type DeleteCandidatureResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  null
>

@injectable()
export class DeleteCandidatureUseCase {
  constructor(
    @inject('CandidatureRepository')
    private candidaturesRepository: ICandidaturesRepository,
  ) {}

  async execute({
    candidatureId,
    userId,
  }: DeleteCandidature): Promise<DeleteCandidatureResponse> {
    const candidature =
      await this.candidaturesRepository.findById(candidatureId)

    if (!candidature) {
      return left(new ResourceNotFoundError())
    }

    if (candidature.userId.toString() !== userId) {
      return left(new NotAllowedError())
    }

    await this.candidaturesRepository.delete(candidature)

    return right(null)
  }
}
