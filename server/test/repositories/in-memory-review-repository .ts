import { PaginationParams } from '@/core/repositories/pagination-params'
import { FindByUserIdAndOpportunityIdProps } from '@/domain/portal/application/repositories/candidatures-repository'
import { IReviewsRepository } from '@/domain/portal/application/repositories/reviews-repository'
import { Review } from '@/domain/portal/enterprise/entities/review'

export class InMemoryReviewRepository implements IReviewsRepository {
  public reviews: Review[] = []

  async create(review: Review): Promise<void> {
    this.reviews.push(review)
  }

  async findByUserIdAndOpportunityId({
    opportunityId,
    userId,
  }: FindByUserIdAndOpportunityIdProps): Promise<Review | null> {
    const review = this.reviews.find(
      (item) =>
        item.userId.toString() === userId &&
        item.opportunityId.toString() === opportunityId,
    )

    if (!review) {
      return null
    }

    return review
  }

  async findManyByUserId(
    userId: string,
    { page, perPage }: PaginationParams,
  ): Promise<Review[]> {
    const reviews = this.reviews
      .filter((item) => item.userId.toString() === userId)
      .slice((page - 1) * perPage, page * perPage)

    return reviews
  }

  async findManyByUsername(
    username: string,
    { page, perPage }: PaginationParams,
  ): Promise<Review[]> {
    const reviews = this.reviews
      .filter((item) => item.userId.toString() === username)
      .slice((page - 1) * perPage, page * perPage)

    return reviews
  }
}
