import { InMemoryCandidatureRepository } from 'test/repositories/in-memory-candidature-repository'
import { makeCandidature } from 'test/factories/make-candidature'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { FetchCandidatesUseCase } from './fetch-candidates'
import { InMemoryOpportunityRepository } from 'test/repositories/in-memory-opportunity-repository'
import { makeOpportunity } from 'test/factories/make-opportunity'
import { NotAllowedError } from '@/core/errors/erros/not-allowed-error'

let inMemoryCandidatureRepository: InMemoryCandidatureRepository
let inMemoryOpportunityRepository: InMemoryOpportunityRepository
let sut: FetchCandidatesUseCase

describe('Fetch candidates', () => {
  beforeEach(() => {
    inMemoryCandidatureRepository = new InMemoryCandidatureRepository()
    inMemoryOpportunityRepository = new InMemoryOpportunityRepository()
    sut = new FetchCandidatesUseCase(
      inMemoryCandidatureRepository,
      inMemoryOpportunityRepository,
    )
  })

  it('should be able fetch all candidates', async () => {
    await inMemoryOpportunityRepository.create(
      makeOpportunity(
        {
          authorId: new UniqueEntityId('1'),
        },
        new UniqueEntityId('1'),
      ),
    )

    for (let i = 0; i < 22; i++) {
      await inMemoryCandidatureRepository.create(
        makeCandidature({
          opportunityId: new UniqueEntityId('1'),
        }),
      )
    }
    const response = await sut.execute({
      opportunityId: '1',
      page: 1,
      perPage: 10,
      userId: '1',
    })

    expect(response.isRight()).toBe(true)
    if (response.isRight()) {
      expect(response.value.candidates).toHaveLength(10)
      expect(inMemoryCandidatureRepository.candidatures).toHaveLength(22)
    }
  })

  it('should be able fetch all candidates page 2', async () => {
    await inMemoryOpportunityRepository.create(
      makeOpportunity(
        {
          authorId: new UniqueEntityId('1'),
        },
        new UniqueEntityId('1'),
      ),
    )
    for (let i = 0; i < 12; i++) {
      await inMemoryCandidatureRepository.create(
        makeCandidature({
          opportunityId: new UniqueEntityId('1'),
        }),
      )
    }
    const response = await sut.execute({
      opportunityId: '1',
      page: 2,
      perPage: 10,
      userId: '1',
    })

    expect(response.isRight()).toBe(true)

    if (response.isRight()) {
      expect(response.value.candidates).toHaveLength(2)
      expect(inMemoryCandidatureRepository.candidatures).toHaveLength(12)
    }
  })

  it('should not get the list of candidates if no is the author of opportunity', async () => {
    await inMemoryOpportunityRepository.create(
      makeOpportunity({}, new UniqueEntityId('1')),
    )

    const response = await sut.execute({
      opportunityId: '1',
      page: 1,
      perPage: 10,
      userId: '1',
    })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(NotAllowedError)
  })
})
