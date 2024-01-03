import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  CandidateProps,
  Candidature,
} from '@/domain/portal/enterprise/entities/candidature'

export function makeCandidature(
  override: Partial<CandidateProps> = {},
  id?: UniqueEntityId,
) {
  const candidature = Candidature.create(
    {
      opportunityId: override.opportunityId ?? new UniqueEntityId(),
      userId: override.userId ?? new UniqueEntityId(),
      opportunity: override.opportunity,
    },
    id,
  )

  return candidature
}
