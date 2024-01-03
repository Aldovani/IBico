import { InMemoryOpportunityRepository } from 'test/repositories/in-memory-opportunity-repository'
import { CreateReviewUseCase } from './create-reviews'
import { InMemoryReviewRepository } from 'test/repositories/in-memory-review-repository '
import { makeOpportunity } from 'test/factories/make-opportunity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/erros/not-allowed-error'
import { ResourceAlreadyExists } from '@/core/errors/erros/resource-already-exists'
import { OpportunityClosedError } from '../candidatures/errors/opportunity-closed-error'

let inMemoryOpportunityRepository: InMemoryOpportunityRepository
let inMemoryReviewRepository: InMemoryReviewRepository
let sut: CreateReviewUseCase

describe('Create a review', () => {
  beforeEach(() => {
    inMemoryOpportunityRepository = new InMemoryOpportunityRepository()
    inMemoryReviewRepository = new InMemoryReviewRepository()
    sut = new CreateReviewUseCase(
      inMemoryOpportunityRepository,
      inMemoryReviewRepository,
    )
  })

  it('should be abale create a review', async () => {
    await inMemoryOpportunityRepository.create(
      makeOpportunity(
        {
          status: 'CLOSED',
          authorId: new UniqueEntityId('1'),
        },
        new UniqueEntityId('1'),
      ),
    )

    const response = await sut.execute({
      description: 'TESTE',
      opportunityId: '1',
      rating: 1,
      userId: '1',
    })

    expect(response.isRight()).toBe(true)
    expect(inMemoryReviewRepository.reviews).toHaveLength(1)
  })

  it('should not be abale create two review from the same user ', async () => {
    await inMemoryOpportunityRepository.create(
      makeOpportunity(
        {
          status: 'CLOSED',
          authorId: new UniqueEntityId('1'),
        },
        new UniqueEntityId('1'),
      ),
    )

    await sut.execute({
      description: 'TESTE',
      opportunityId: '1',
      rating: 1,
      userId: '1',
    })
    const response = await sut.execute({
      description: 'TESTE',
      opportunityId: '1',
      rating: 1,
      userId: '1',
    })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(ResourceAlreadyExists)
    expect(inMemoryReviewRepository.reviews).toHaveLength(1)
  })

  it('should  be abale create the review from the author and the candidate ', async () => {
    await inMemoryOpportunityRepository.create(
      makeOpportunity(
        {
          status: 'CLOSED',
          candidateId: new UniqueEntityId('2'),
          authorId: new UniqueEntityId('1'),
        },
        new UniqueEntityId('1'),
      ),
    )

    const candidateResponse = await sut.execute({
      description: 'TESTE',
      opportunityId: '1',
      rating: 1,
      userId: '2',
    })

    const authorResponse = await sut.execute({
      description: 'TESTE',
      opportunityId: '1',
      rating: 1,
      userId: '1',
    })

    expect(authorResponse.isRight()).toBe(true)
    expect(candidateResponse.isRight()).toBe(true)
    expect(inMemoryReviewRepository.reviews).toHaveLength(2)
  })

  it('should not be abale create a review in a non-existent opportunity ', async () => {
    const response = await sut.execute({
      description: 'TESTE',
      opportunityId: '1',
      rating: 1,
      userId: '1',
    })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(ResourceNotFoundError)
    expect(inMemoryReviewRepository.reviews).toHaveLength(0)
  })

  it('should not be abale create a review if not is a author or candidate ', async () => {
    await inMemoryOpportunityRepository.create(
      makeOpportunity(
        {
          status: 'CLOSED',
        },
        new UniqueEntityId('1'),
      ),
    )

    const response = await sut.execute({
      description: 'TESTE',
      opportunityId: '1',
      rating: 1,
      userId: '1',
    })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(NotAllowedError)
    expect(inMemoryReviewRepository.reviews).toHaveLength(0)
  })

  it('should not be able create a review if status of opportunity is different the CLOSED', async () => {
    await inMemoryOpportunityRepository.create(
      makeOpportunity(
        {
          authorId: new UniqueEntityId('1'),
        },
        new UniqueEntityId('1'),
      ),
    )

    const response = await sut.execute({
      description: 'TESTE',
      opportunityId: '1',
      rating: 1,
      userId: '1',
    })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(OpportunityClosedError)
  })
})
