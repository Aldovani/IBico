import { InMemoryReviewRepository } from 'test/repositories/in-memory-review-repository '
import { FetchMyReviewsUseCase } from './fetch-my-reviews'
import { makeReview } from 'test/factories/make-reviews'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryReviewRepository: InMemoryReviewRepository
let sut: FetchMyReviewsUseCase

describe('Fetch the reviews', () => {
  beforeEach(() => {
    inMemoryReviewRepository = new InMemoryReviewRepository()
    sut = new FetchMyReviewsUseCase(inMemoryReviewRepository)
  })

  it('should be able fetch all reviews', async () => {
    for (let i = 0; i < 22; i++) {
      inMemoryReviewRepository.create(
        makeReview({
          userId: new UniqueEntityId('1'),
        }),
      )
    }

    const response = await sut.execute({
      page: 1,
      userId: '1',
      perPage: 10,
    })

    if (!response.isRight()) return

    expect(response.isRight()).toBe(true)
    expect(response.value.reviews).toHaveLength(10)
    expect(inMemoryReviewRepository.reviews).toHaveLength(22)
  })

  it('should be able fetch the page 3', async () => {
    for (let i = 0; i < 22; i++) {
      inMemoryReviewRepository.create(
        makeReview({
          userId: new UniqueEntityId('1'),
        }),
      )
    }

    const response = await sut.execute({
      page: 3,
      userId: '1',
      perPage: 10,
    })

    if (!response.isRight()) return

    expect(response.isRight()).toBe(true)
    expect(response.value.reviews).toHaveLength(2)
    expect(inMemoryReviewRepository.reviews).toHaveLength(22)
  })
})
