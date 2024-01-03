import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Opportunity } from './opportunity'

export type ReviewProps = {
  description: string
  rating: number
  userId: UniqueEntityId
  opportunityId: UniqueEntityId
  opportunity?: Opportunity

  createdAt: Date
}

export class Review extends Entity<ReviewProps> {
  static create(
    props: Optional<ReviewProps, 'createdAt' | 'opportunity'>,
    id?: UniqueEntityId,
  ) {
    const review = new Review(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return review
  }

  get rating() {
    return this.props.rating
  }

  get description() {
    return this.props.description
  }

  get userId() {
    return this.props.userId
  }

  get opportunityId() {
    return this.props.opportunityId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get opportunity() {
    return this.props.opportunity
  }
}
