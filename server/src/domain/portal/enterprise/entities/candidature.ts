import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Opportunity } from './opportunity'

export type CandidateProps = {
  createdAt: Date
  userId: UniqueEntityId
  opportunityId: UniqueEntityId
  opportunity?: Opportunity
}

export class Candidature extends Entity<CandidateProps> {
  static create(
    props: Optional<CandidateProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const candidature = new Candidature(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return candidature
  }

  get opportunityId() {
    return this.props.opportunityId
  }

  set opportunityId(opportunityId: UniqueEntityId) {
    this.props.opportunityId = opportunityId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get userId() {
    return this.props.userId
  }

  set userId(userId: UniqueEntityId) {
    this.props.userId = userId
  }

  get opportunity() {
    return this.props.opportunity
  }
}
