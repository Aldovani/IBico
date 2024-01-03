import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export type SkillsProps = {
  createdAt: Date
  name: string
}

export class Skill extends Entity<SkillsProps> {
  static create(
    props: Optional<SkillsProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const skill = new Skill(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return skill
  }

  get name() {
    return this.props.name
  }
}
