import { Candidature as PrismaCandidature, Prisma } from '@prisma/client'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Candidature } from '@/domain/portal/enterprise/entities/candidature'
import { Opportunity } from '@/domain/portal/enterprise/entities/opportunity'
import { OpportunitySkillList } from '@/domain/portal/enterprise/entities/opportunity-skill-list'
import { Candidate } from '@/domain/portal/enterprise/entities/candidate'
import { Author } from '@/domain/portal/enterprise/entities/author'

type PrismaCandidates = {
  id: string
  name: string
  cellphone: string
  username: string
  avatar: string | null
  rating: number | null
}

type CandidatureType = {
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
      name: string
      avatar: string | null
      username: string
    }
  }
} & PrismaCandidature

export class PrismaCandidatureMapper {
  static toDomain(raw: PrismaCandidature): Candidature {
    return Candidature.create(
      {
        opportunityId: new UniqueEntityId(raw.opportunityId),
        userId: new UniqueEntityId(raw.userId),
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toManyDomain(raw: CandidatureType[]): Candidature[] {
    return raw.map((item) =>
      Candidature.create(
        {
          opportunityId: new UniqueEntityId(item.opportunityId),
          userId: new UniqueEntityId(item.userId),
          createdAt: item.createdAt,
          opportunity: Opportunity.create(
            {
              amount: item.Opportunity.amount,
              authorId: new UniqueEntityId(item.Opportunity.authorId),
              candidateId: new UniqueEntityId(
                item.Opportunity.candidateId || undefined,
              ),
              createdAt: item.Opportunity.createdAt,
              description: item.Opportunity.description,
              endDateTime: item.Opportunity.endDateTime,
              startDateTime: item.Opportunity.startDateTime,
              local: item.Opportunity.local,
              timeLoad: item.Opportunity.timeLoad,
              skills: new OpportunitySkillList(),
              title: item.Opportunity.title,
              Author: Author.create({
                avatar: item.Opportunity.Author.avatar,
                name: item.Opportunity.Author.name,
                username: item.Opportunity.Author.username,
              }),
            },
            new UniqueEntityId(item.Opportunity.id),
          ),
        },
        new UniqueEntityId(item.id),
      ),
    )
  }

  static toPrisma(
    candidature: Candidature,
  ): Prisma.CandidatureUncheckedCreateInput {
    return {
      id: candidature.id.toString(),
      createdAt: candidature.createdAt,
      opportunityId: candidature.opportunityId.toString(),
      userId: candidature.userId.toString(),
    }
  }

  static toManyCandidatesDomain(candidates: PrismaCandidates[]): Candidate[] {
    return candidates.map((item) =>
      Candidate.create(
        {
          avatar: item.avatar,
          name: item.name,
          rating: item.rating || 10,
          username: item.username,
        },
        new UniqueEntityId(item.id),
      ),
    )
  }
}
