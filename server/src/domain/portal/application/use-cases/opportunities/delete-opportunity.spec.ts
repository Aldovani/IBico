import { InMemoryOpportunityRepository } from 'test/repositories/in-memory-opportunity-repository'
import { DeleteOpportunityUseCase } from './delete-opportunity'
import { makeOpportunity } from 'test/factories/make-opportunity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/erros/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'

let inMemoryOpportunityRepository: InMemoryOpportunityRepository
let sut: DeleteOpportunityUseCase

describe('Choose candidate opportunity', () => {
  beforeEach(() => {
    inMemoryOpportunityRepository = new InMemoryOpportunityRepository()
    sut = new DeleteOpportunityUseCase(inMemoryOpportunityRepository)
  })

  it('should be able delete a opportunity', async () => {
    await inMemoryOpportunityRepository.create(
      makeOpportunity(
        { authorId: new UniqueEntityId('1') },
        new UniqueEntityId('1'),
      ),
    )

    await sut.execute({
      opportunityId: '1',
      userId: '1',
    })

    expect(inMemoryOpportunityRepository.opportunities).toHaveLength(0)
  })

  it('should not be able delete a opportunity from other user', async () => {
    await inMemoryOpportunityRepository.create(
      makeOpportunity({}, new UniqueEntityId('1')),
    )

    const response = await sut.execute({
      opportunityId: '1',
      userId: '1',
    })

    expect(response.isLeft()).toBe(true)
    expect(inMemoryOpportunityRepository.opportunities).toHaveLength(1)
    expect(response.value).toBeInstanceOf(NotAllowedError)
  })

  it('should not be able delete a non-existent opportunity ', async () => {
    await inMemoryOpportunityRepository.create(
      makeOpportunity({}, new UniqueEntityId('1')),
    )

    const response = await sut.execute({
      opportunityId: '2',
      userId: '1',
    })

    expect(inMemoryOpportunityRepository.opportunities).toHaveLength(1)
    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
