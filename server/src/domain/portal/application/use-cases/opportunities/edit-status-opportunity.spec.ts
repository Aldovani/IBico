import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOpportunityRepository } from 'test/repositories/in-memory-opportunity-repository'
import { makeOpportunity } from 'test/factories/make-opportunity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { EditStatusOpportunityUseCase } from './edit-status-opportunity'

let inMemoryOpportunityRepository: InMemoryOpportunityRepository
let sut: EditStatusOpportunityUseCase

describe('Edit status opportunity', () => {
  beforeEach(() => {
    inMemoryOpportunityRepository = new InMemoryOpportunityRepository()
    sut = new EditStatusOpportunityUseCase(inMemoryOpportunityRepository)
  })
  it('should be edit the status of the opportunity', async () => {
    await inMemoryOpportunityRepository.create(
      makeOpportunity(
        {
          authorId: new UniqueEntityId('1'),
          status: 'CREATED',
        },
        new UniqueEntityId('1'),
      ),
    )
    const response = await sut.execute({
      opportunityId: '1',
      status: 'CREATED',
      userId: '1',
    })

    expect(response.isRight()).toBe(true)
    if (response.isRight()) {
      expect(response.value.opportunity.status).toEqual('CREATED')
    }
  })
})
