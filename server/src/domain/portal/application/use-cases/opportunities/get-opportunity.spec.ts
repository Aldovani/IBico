import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOpportunityRepository } from 'test/repositories/in-memory-opportunity-repository'
import { GetOpportunityUseCase } from './get-opportunity'
import { makeOpportunity } from 'test/factories/make-opportunity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'

let inMemoryOpportunityRepository: InMemoryOpportunityRepository
let sut: GetOpportunityUseCase

describe('Get opportunity', () => {
  beforeEach(() => {
    inMemoryOpportunityRepository = new InMemoryOpportunityRepository()
    sut = new GetOpportunityUseCase(inMemoryOpportunityRepository)
  })

  it('should get a opportunity', async () => {
    await inMemoryOpportunityRepository.create(
      makeOpportunity({}, new UniqueEntityId('1')),
    )

    const response = await sut.execute({
      opportunityId: '1',
    })

    expect(response.value).toEqual(
      expect.objectContaining({
        opportunity: expect.objectContaining({
          status: 'CREATED',
        }),
      }),
    )
  })

  it('should not get a non-existent opportunity', async () => {
    await inMemoryOpportunityRepository.create(makeOpportunity({}))
    const response = await sut.execute({
      opportunityId: '1',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
