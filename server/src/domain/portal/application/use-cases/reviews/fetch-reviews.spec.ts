import { InMemoryReviewRepository } from 'test/repositories/in-memory-review-repository '
import { makeReview } from 'test/factories/make-reviews'
import { FetchReviewsUseCase } from './fetch-reviews'
import { makeUser } from 'test/factories/make-user'

let inMemoryReviewRepository: InMemoryReviewRepository
let sut: FetchReviewsUseCase

describe('Fetch reviews', () => {
  beforeEach(() => {
    inMemoryReviewRepository = new InMemoryReviewRepository()
    sut = new FetchReviewsUseCase(inMemoryReviewRepository)
  })

  it('should be able get reviews', async () => {
    for (let index = 0; index < 12; index++) {
      await inMemoryReviewRepository.create(
        makeReview({
          user: makeUser({ username: 'aldovani' }),
        }),
      )
    }

    const response = await sut.execute({
      page: 1,
      perPage: 10,
      username: 'aldovani',
    })

    expect(response.isRight())
    if (response.isRight()) {
      expect(response.value.reviews).toHaveLength(10)
    }
  })
})
