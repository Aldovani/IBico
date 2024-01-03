import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export type OpportunitySkillProps = {
  opportunityId: UniqueEntityId
  skillId: UniqueEntityId
  name?: string
}

export class OpportunitySkill extends Entity<OpportunitySkillProps> {
  static create({ skillId, opportunityId, name }: OpportunitySkillProps) {
    const opportunitySkill = new OpportunitySkill({
      skillId,
      opportunityId,
      name,
    })

    return opportunitySkill
  }

  get opportunityId() {
    return this.props.opportunityId
  }

  get skillId() {
    return this.props.skillId
  }

  get name() {
    return this.props.name
  }
}
