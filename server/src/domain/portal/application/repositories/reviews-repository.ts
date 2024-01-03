import { PaginationParams } from '@/core/repositories/pagination-params'
import { Review } from '../../enterprise/entities/review'

export type FindByUserIdAndOpportunityIdProps = {
  opportunityId: string
  userId: string
}

export interface IReviewsRepository {
  create(review: Review): Promise<void>
  findManyByUserId(
    userId: string,
    paginationParams: PaginationParams,
  ): Promise<Review[]>
  findManyByUsername(
    username: string,
    paginationParams: PaginationParams,
  ): Promise<Review[]>
  findByUserIdAndOpportunityId(
    data: FindByUserIdAndOpportunityIdProps,
  ): Promise<Review | null>
}
