import { Skill as PrismaSkill, Prisma } from '@prisma/client'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Skill } from '@/domain/portal/enterprise/entities/skill'

export class PrismaSkillMapper {
  static toDomain(raw: PrismaSkill): Skill {
    return Skill.create(
      {
        name: raw.name,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(skill: Skill): Prisma.SkillUncheckedCreateInput {
    return {
      name: skill.name,
      id: skill.id.toString(),
    }
  }
}
