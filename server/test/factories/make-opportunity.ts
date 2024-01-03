import { faker } from '@faker-js/faker'

import {
  Opportunity,
  OpportunityProps,
} from '@/domain/portal/enterprise/entities/opportunity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { OpportunitySkillList } from '@/domain/portal/enterprise/entities/opportunity-skill-list'

export function makeOpportunity(
  override: Partial<OpportunityProps> = {},
  id?: UniqueEntityId,
) {
  const opportunity = Opportunity.create(
    {
      amount: faker.number.int(),
      description: faker.lorem.sentence(2),
      local: override.local ?? faker.location.city(),
      title: faker.lorem.text(),
      endDateTime: new Date(),
      startDateTime: new Date(),
      skills: override.skills || new OpportunitySkillList(),
      authorId: override.authorId ?? new UniqueEntityId(),
      timeLoad: '',
      status: override.status || 'CREATED',
      candidateId: override.candidateId,
    },
    id,
  )

  return opportunity
}
