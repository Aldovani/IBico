import { UserSkill as PrismaUserSkill } from '@prisma/client'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { UserSkill } from '@/domain/portal/enterprise/entities/user-skill'

export class PrismaUserSkillMapper {
  static toDomain(raw: PrismaUserSkill): UserSkill {
    return UserSkill.create({
      skillId: new UniqueEntityId(raw.skillId),
      userId: new UniqueEntityId(raw.userId),
    })
  }
}
