import { inject, injectable } from 'tsyringe'
import { PrismaService } from '../services/prisma-service'
import {
  FindByUserIdAndOpportunityIdProps,
  IReviewsRepository,
} from '@/domain/portal/application/repositories/reviews-repository'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { Review } from '@/domain/portal/enterprise/entities/review'
import { PrismaReviewMapper } from '../mappers/prisma-review-mapper'

@injectable()
export class PrismaReviewRepository implements IReviewsRepository {
  constructor(
    @inject('PrismaService')
    private PrismaService: PrismaService,
  ) {}

  async create(review: Review): Promise<void> {
    const data = PrismaReviewMapper.toPrisma(review)

    await this.PrismaService.review.create({
      data,
    })
  }

  async findManyByUserId(
    userId: string,
    { page, perPage }: PaginationParams,
  ): Promise<Review[]> {
    const reviews = await this.PrismaService.review.findMany({
      where: {
        authorId: userId,
      },
      include: {
        Opportunity: {
          include: { Author: {} },
        },
      },
      take: perPage,
      skip: (page - 1) * perPage,
    })
    return PrismaReviewMapper.toManyDomainWithOpportunity(reviews)
  }

  async findManyByUsername(
    username: string,
    { page, perPage }: PaginationParams,
  ): Promise<Review[]> {
    const reviews = await this.PrismaService.review.findMany({
      where: {
        Opportunity: {
          Candidate: {
            username,
          },
        },
      },
      include: {
        Opportunity: {
          include: { Author: {} },
        },
      },
      take: perPage,
      skip: (page - 1) * perPage,
    })

    return PrismaReviewMapper.toManyDomainWithOpportunity(reviews)
  }

  async findByUserIdAndOpportunityId({
    opportunityId,
    userId,
  }: FindByUserIdAndOpportunityIdProps): Promise<Review | null> {
    const review = await this.PrismaService.review.findFirst({
      where: {
        authorId: userId,
        opportunityId,
      },
    })

    if (!review) {
      return null
    }

    return PrismaReviewMapper.toDomain(review)
  }
}
