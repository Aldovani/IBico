import { IOpportunitiesRepository } from '@/domain/portal/application/repositories/opportunities-repository'
import { Either, left, right } from '@/core/types/either'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/erros/not-allowed-error'
import { Review } from '@/domain/portal/enterprise/entities/review'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { IReviewsRepository } from '../../repositories/reviews-repository'
import { ResourceAlreadyExists } from '@/core/errors/erros/resource-already-exists'
import { OpportunityClosedError } from '../candidatures/errors/opportunity-closed-error'
import { inject, injectable } from 'tsyringe'

type CreateReviewRequest = {
  description: string
  opportunityId: string
  userId: string
  rating: number
}

type CreateReviewResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    review: Review
  }
>

@injectable()
export class CreateReviewUseCase {
  constructor(
    @inject('OpportunityRepository')
    private opportunityRepository: IOpportunitiesRepository,
    @inject('ReviewRepository')
    private reviewRepository: IReviewsRepository,
  ) {}

  async execute({
    userId,
    description,
    opportunityId,
    rating,
  }: CreateReviewRequest): Promise<CreateReviewResponse> {
    const opportunity = await this.opportunityRepository.findById(opportunityId)

    if (!opportunity) {
      return left(new ResourceNotFoundError())
    }

    if (opportunity.status !== 'CLOSED') {
      return left(new OpportunityClosedError(opportunityId))
    }

    const isAuthorOrCandidate =
      opportunity.authorId.toString() === userId ||
      opportunity.candidateId?.toString() === userId

    if (!isAuthorOrCandidate) {
      return left(new NotAllowedError())
    }

    const existesAReview =
      await this.reviewRepository.findByUserIdAndOpportunityId({
        opportunityId,
        userId,
      })

    if (existesAReview) {
      return left(new ResourceAlreadyExists())
    }

    const review = Review.create({
      description,
      rating,
      userId: new UniqueEntityId(userId),
      opportunityId: new UniqueEntityId(opportunityId),
    })

    await this.reviewRepository.create(review)

    return right({
      review,
    })
  }
}
