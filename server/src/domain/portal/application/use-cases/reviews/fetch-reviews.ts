import { Either, right } from '@/core/types/either'
import { Review } from '@/domain/portal/enterprise/entities/review'
import { IReviewsRepository } from '../../repositories/reviews-repository'
import { inject, injectable } from 'tsyringe'

type FetchReviewsRequest = {
  username: string
  page: number
  perPage: number
}

type FetchReviewsResponse = Either<
  unknown,
  {
    reviews: Review[]
  }
>
@injectable()
export class FetchReviewsUseCase {
  constructor(
    @inject('ReviewRepository')
    private reviewRepository: IReviewsRepository,
  ) {}

  async execute({
    username,
    page,
    perPage,
  }: FetchReviewsRequest): Promise<FetchReviewsResponse> {
    const reviews = await this.reviewRepository.findManyByUsername(username, {
      page,
      perPage,
    })

    return right({
      reviews,
    })
  }
}
