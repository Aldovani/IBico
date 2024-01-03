import { Prisma, Review as PrismaReview } from '@prisma/client'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Review } from '@/domain/portal/enterprise/entities/review'
import {
  Opportunity,
  OpportunityStatus,
} from '@/domain/portal/enterprise/entities/opportunity'
import { OpportunitySkillList } from '@/domain/portal/enterprise/entities/opportunity-skill-list'
import { Author } from '@/domain/portal/enterprise/entities/author'

type PrismaReviewWithOpportunity = PrismaReview & {
  Opportunity: {
    id: string
    title: string
    description: string
    amount: number
    local: string
    status: string
    startDateTime: Date
    endDateTime: Date
    timeLoad: string
    opportunityClosedTime: Date | null
    createdAt: Date
    authorId: string
    candidateId: string | null
    Author: {
      id: string
      name: string
      cellphone: string
      username: string
      cpf: string
      avatar: string | null
      password: string
      rating: number
      active: boolean
      createdAt: Date
    }
  }
}

export class PrismaReviewMapper {
  static toDomain(raw: PrismaReview): Review {
    return Review.create({
      description: raw.description,
      opportunityId: new UniqueEntityId(raw.opportunityId),
      userId: new UniqueEntityId(raw.authorId),
      rating: raw.rating,
      createdAt: raw.createdAt,
    })
  }

  static toManyDomain(reviews: PrismaReview[]): Review[] {
    return reviews.map((item) =>
      Review.create({
        description: item.description,
        opportunityId: new UniqueEntityId(item.opportunityId),
        userId: new UniqueEntityId(item.authorId),
        rating: item.rating,
        createdAt: item.createdAt,
      }),
    )
  }

  static toManyDomainWithOpportunity(
    reviews: PrismaReviewWithOpportunity[],
  ): Review[] {
    return reviews.map((item) =>
      Review.create({
        description: item.description,
        opportunityId: new UniqueEntityId(item.opportunityId),
        userId: new UniqueEntityId(item.authorId),
        rating: item.rating,
        createdAt: item.createdAt,
        opportunity: Opportunity.create(
          {
            amount: item.Opportunity.amount,
            authorId: new UniqueEntityId(item.Opportunity.authorId),
            candidateId: item.Opportunity.candidateId
              ? new UniqueEntityId(item.Opportunity.candidateId)
              : null,
            description: item.Opportunity.description,
            endDateTime: item.Opportunity.endDateTime,
            local: item.Opportunity.local,
            opportunityClosedTime: item.Opportunity.opportunityClosedTime,
            startDateTime: item.Opportunity.startDateTime,
            status: item.Opportunity.status as OpportunityStatus,
            timeLoad: item.Opportunity.timeLoad,
            title: item.Opportunity.title,
            skills: new OpportunitySkillList(),
            Author: Author.create({
              avatar: item.Opportunity.Author.avatar,
              name: item.Opportunity.Author.name,
              username: item.Opportunity.Author.username,
            }),
          },
          new UniqueEntityId(item.Opportunity.id),
        ),
      }),
    )
  }

  static toPrisma(raw: Review): Prisma.ReviewUncheckedCreateInput {
    return {
      authorId: raw.userId.toString(),
      createdAt: raw.createdAt,
      description: raw.description,
      id: raw.id.toString(),
      opportunityId: raw.opportunityId.toString(),
      rating: raw.rating,
    }
  }
}
