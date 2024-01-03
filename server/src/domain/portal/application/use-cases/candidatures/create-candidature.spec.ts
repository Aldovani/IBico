import { InMemoryOpportunityRepository } from 'test/repositories/in-memory-opportunity-repository'
import { makeOpportunity } from 'test/factories/make-opportunity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { CreateCandidatureUseCase } from './create-candidature'
import { InMemoryCandidatureRepository } from 'test/repositories/in-memory-candidature-repository'
import { NotAllowedError } from '@/core/errors/erros/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { OpportunityClosedError } from './errors/opportunity-closed-error'

let inMemoryOpportunityRepository: InMemoryOpportunityRepository
let inMemoryCandidatureRepository: InMemoryCandidatureRepository
let sut: CreateCandidatureUseCase

describe('Create a candidature', () => {
  beforeEach(() => {
    inMemoryOpportunityRepository = new InMemoryOpportunityRepository()
    inMemoryCandidatureRepository = new InMemoryCandidatureRepository()
    sut = new CreateCandidatureUseCase(
      inMemoryOpportunityRepository,
      inMemoryCandidatureRepository,
    )
  })

  it('should be able to create a candidature', async () => {
    await inMemoryOpportunityRepository.create(
      makeOpportunity({}, new UniqueEntityId('1')),
    )
    const response = await sut.execute({
      opportunityId: '1',
      userId: '1',
    })

    expect(response.isRight()).toBe(true)
    expect(inMemoryCandidatureRepository.candidatures).toHaveLength(1)
    expect(inMemoryCandidatureRepository.candidatures[0]).toEqual(
      expect.objectContaining({
        opportunityId: new UniqueEntityId('1'),
        userId: new UniqueEntityId('1'),
      }),
    )
  })

  it('should not be able candidature in a closed opportunity', async () => {
    await inMemoryOpportunityRepository.create(
      makeOpportunity(
        {
          status: 'CLOSED',
        },
        new UniqueEntityId('1'),
      ),
    )
    const response = await sut.execute({
      opportunityId: '1',
      userId: '1',
    })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(OpportunityClosedError)
  })

  it('should not be able to candidature more one time', async () => {
    await inMemoryOpportunityRepository.create(
      makeOpportunity({}, new UniqueEntityId('1')),
    )
    await sut.execute({
      opportunityId: '1',
      userId: '1',
    })

    const response = await sut.execute({
      opportunityId: '1',
      userId: '1',
    })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(NotAllowedError)
    expect(inMemoryCandidatureRepository.candidatures).toHaveLength(1)
  })

  it('should not be able to apply for an opportunity created by the same user', async () => {
    await inMemoryOpportunityRepository.create(
      makeOpportunity(
        {
          authorId: new UniqueEntityId('1'),
        },
        new UniqueEntityId('1'),
      ),
    )

    const response = await sut.execute({
      opportunityId: '1',
      userId: '1',
    })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(NotAllowedError)
    expect(inMemoryCandidatureRepository.candidatures).toHaveLength(0)
  })

  it('should not be able to candidature in a non-existent opportunity', async () => {
    const response = await sut.execute({
      opportunityId: '1',
      userId: '1',
    })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(ResourceNotFoundError)
    expect(inMemoryCandidatureRepository.candidatures).toHaveLength(0)
  })
})
