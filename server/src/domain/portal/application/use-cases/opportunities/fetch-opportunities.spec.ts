import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOpportunityRepository } from 'test/repositories/in-memory-opportunity-repository'
import { makeOpportunity } from 'test/factories/make-opportunity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { FetchOpportunityUseCase } from './fetch-opportunities'

let inMemoryOpportunityRepository: InMemoryOpportunityRepository
let sut: FetchOpportunityUseCase

describe('Fetch opportunities', () => {
  beforeEach(() => {
    inMemoryOpportunityRepository = new InMemoryOpportunityRepository()
    sut = new FetchOpportunityUseCase(inMemoryOpportunityRepository)
  })

  it('should fetch the opportunity', async () => {
    for (let index = 0; index < 12; index++) {
      await inMemoryOpportunityRepository.create(
        makeOpportunity({ authorId: new UniqueEntityId('1') }),
      )
    }

    const response = await sut.execute({
      page: 2,
      perPage: 10,
    })

    if (response.isLeft()) {
      return
    }
    expect(inMemoryOpportunityRepository.opportunities).toHaveLength(12)
    expect(response.value.opportunities).toHaveLength(2)
  })

  it('should fetch with query params the opportunities', async () => {
    for (let index = 0; index < 12; index++) {
      await inMemoryOpportunityRepository.create(makeOpportunity())
    }
    await inMemoryOpportunityRepository.create(
      makeOpportunity({ local: 'Local teste' }),
    )
    await inMemoryOpportunityRepository.create(
      makeOpportunity({ local: 'Local teste' }),
    )

    const response = await sut.execute({
      page: 1,
      local: 'Local teste',
      perPage: 10,
    })

    expect(inMemoryOpportunityRepository.opportunities).toHaveLength(14)
    expect(response.value?.opportunities).toHaveLength(2)
  })
})
