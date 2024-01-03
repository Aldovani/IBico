import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOpportunityRepository } from 'test/repositories/in-memory-opportunity-repository'
import { makeOpportunity } from 'test/factories/make-opportunity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { FetchMyOpportunityUseCase } from './fetch-my-opportunities'

let inMemoryOpportunityRepository: InMemoryOpportunityRepository
let sut: FetchMyOpportunityUseCase

describe('Fetch my opportunities', () => {
  beforeEach(() => {
    inMemoryOpportunityRepository = new InMemoryOpportunityRepository()
    sut = new FetchMyOpportunityUseCase(inMemoryOpportunityRepository)
  })

  it('should get my opportunity', async () => {
    for (let index = 0; index < 12; index++) {
      await inMemoryOpportunityRepository.create(
        makeOpportunity({ authorId: new UniqueEntityId('1') }),
      )
    }

    const response = await sut.execute({
      userId: '1',
      status: 'CREATED',
      page: 2,
      perPage: 10,
    })

    expect(inMemoryOpportunityRepository.opportunities).toHaveLength(12)
    expect(response.value?.opportunities).toHaveLength(2)
  })
})
