import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Skill, SkillsProps } from '@/domain/portal/enterprise/entities/skill'
import { faker } from '@faker-js/faker'

export function makeSkill(
  override: Partial<SkillsProps> = {},
  id?: UniqueEntityId,
) {
  const skill = Skill.create(
    {
      name: override.name || faker.lorem.word(1),
    },
    id,
  )

  return skill
}
