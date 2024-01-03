import { Prisma, Opportunity as PrismaOpportunity } from '@prisma/client'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Opportunity,
  OpportunityStatus,
} from '@/domain/portal/enterprise/entities/opportunity'
import { OpportunitySkillList } from '@/domain/portal/enterprise/entities/opportunity-skill-list'
import { OpportunitySkill } from '@/domain/portal/enterprise/entities/opportunity-skill'
import { Author } from '@/domain/portal/enterprise/entities/author'

type PrismaOpportunityAuthor = PrismaOpportunity & {
  Author: {
    name: string
    username: string
    avatar: string | null
  }
}
type PrismaOpportunitySkill = PrismaOpportunity & {
  skills: ({
    skill: {
      id: string
      name: string
    }
  } & {
    skillId: string
    opportunityId: string
  })[]
  Author: {
    name: string
    username: string
    avatar: string | null
  }
}

export class PrismaOpportunityMapper {
  static toDomain(raw: PrismaOpportunitySkill): Opportunity {
    return Opportunity.create(
      {
        amount: raw.amount,
        authorId: new UniqueEntityId(raw.authorId),
        description: raw.description,
        candidateId: raw.candidateId
          ? new UniqueEntityId(raw.candidateId)
          : null,
        endDateTime: raw.endDateTime,
        local: raw.local,
        startDateTime: raw.startDateTime,
        timeLoad: raw.timeLoad,
        title: raw.title,
        createdAt: raw.createdAt,
        opportunityClosedTime: raw.opportunityClosedTime,
        status: raw.status as OpportunityStatus,
        skills: new OpportunitySkillList(
          raw.skills.map((item) =>
            OpportunitySkill.create({
              opportunityId: new UniqueEntityId(item.opportunityId),
              skillId: new UniqueEntityId(item.skillId),
              name: item.skill.name,
            }),
          ),
        ),
        Author: Author.create({
          avatar: raw.Author.avatar,
          name: raw.Author.name,
          username: raw.Author.username,
        }),
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toManyDomain(raw: PrismaOpportunityAuthor[]): Opportunity[] {
    return raw.map((item) =>
      Opportunity.create(
        {
          amount: item.amount,
          authorId: new UniqueEntityId(item.authorId),
          description: item.description,
          candidateId: item.candidateId
            ? new UniqueEntityId(item.candidateId)
            : null,
          endDateTime: item.endDateTime,
          local: item.local,
          startDateTime: item.startDateTime,
          timeLoad: item.timeLoad,
          title: item.title,
          createdAt: item.createdAt,
          opportunityClosedTime: item.opportunityClosedTime,
          status: item.status as OpportunityStatus,
          skills: new OpportunitySkillList(),
          Author: Author.create({
            avatar: item.Author.avatar,
            name: item.Author.name,
            username: item.Author.username,
          }),
        },
        new UniqueEntityId(item.id),
      ),
    )
  }

  static toPrisma(
    opportunity: Opportunity,
  ): Prisma.OpportunityUncheckedCreateInput {
    return {
      id: opportunity.id.toString(),
      amount: opportunity.amount,
      authorId: opportunity.authorId.toString(),
      description: opportunity.description,
      candidateId: opportunity.candidateId?.toString() || null,
      endDateTime: opportunity.endDateTime,
      local: opportunity.local,
      startDateTime: opportunity.startDateTime,
      timeLoad: opportunity.timeLoad,
      title: opportunity.title,
      createdAt: opportunity.createdAt,
      opportunityClosedTime: opportunity.opportunityClosedTime,
      status: opportunity.status as OpportunityStatus,
    }
  }
}
