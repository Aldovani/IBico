import {
  Prisma,
  OpportunitySkill as PrismaOpportunitySkill,
} from '@prisma/client'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { OpportunitySkill } from '@/domain/portal/enterprise/entities/opportunity-skill'

export class PrismaOpportunitySkillMapper {
  static toDomain(raw: PrismaOpportunitySkill[]): OpportunitySkill[] {
    return raw.map((item) =>
      OpportunitySkill.create({
        skillId: new UniqueEntityId(item.skillId),
        opportunityId: new UniqueEntityId(item.opportunityId),
      }),
    )
  }

  static toManyPrisma(
    opportunities: OpportunitySkill[],
  ): Prisma.OpportunitySkillUncheckedCreateInput[] {
    return opportunities.map((item) => ({
      skillId: item.skillId.toString(),
      opportunityId: item.opportunityId.toString(),
    }))
  }
}
