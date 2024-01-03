import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export type UserSkillProps = {
  userId: UniqueEntityId
  skillId: UniqueEntityId
  name?: string
}

export class UserSkill extends Entity<UserSkillProps> {
  static create({ skillId, userId, name }: UserSkillProps) {
    const userSkill = new UserSkill({
      skillId,
      userId,
      name,
    })

    return userSkill
  }

  get userId() {
    return this.props.userId
  }

  get name() {
    return this.props.name
  }

  get skillId() {
    return this.props.skillId
  }
}
