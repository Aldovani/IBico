import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Review, ReviewProps } from '@/domain/portal/enterprise/entities/review'
import { faker } from '@faker-js/faker'
import { makeUser } from './make-user'

export function makeReview(
  override: Partial<ReviewProps> = {},
  id?: UniqueEntityId,
) {
  const review = Review.create(
    {
      description: faker.lorem.sentence(1),
      rating: faker.number.int({
        max: 10,
        min: 0,
      }),
      opportunityId: override.opportunityId ?? new UniqueEntityId(),
      userId: override.userId ?? new UniqueEntityId(),
      user: override.user ?? makeUser(),
    },
    id,
  )

  return review
}
