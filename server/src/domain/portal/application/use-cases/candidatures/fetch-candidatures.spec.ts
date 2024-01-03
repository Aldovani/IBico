import { InMemoryCandidatureRepository } from 'test/repositories/in-memory-candidature-repository'
import { makeCandidature } from 'test/factories/make-candidature'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { FetchCandidaturesUseCase } from './fetch-candidatures'
import { makeOpportunity } from 'test/factories/make-opportunity'

let inMemoryCandidatureRepository: InMemoryCandidatureRepository
let sut: FetchCandidaturesUseCase

describe('Fetch candidatures', () => {
  beforeEach(() => {
    inMemoryCandidatureRepository = new InMemoryCandidatureRepository()
    sut = new FetchCandidaturesUseCase(inMemoryCandidatureRepository)
  })

  it('should be able fetch all candidatures', async () => {
    for (let i = 0; i < 22; i++) {
      await inMemoryCandidatureRepository.create(
        makeCandidature({
          userId: new UniqueEntityId('1'),
          opportunity: makeOpportunity({ status: 'CREATED' }),
        }),
      )
    }
    const response = await sut.execute({
      userId: '1',
      status: 'CREATED',
      page: 1,
      perPage: 10,
    })

    expect(response.isRight()).toBe(true)
    expect(response.value?.candidatures).toHaveLength(10)
    expect(inMemoryCandidatureRepository.candidatures).toHaveLength(22)
  })

  it('should be able fetch all candidatures page 2', async () => {
    for (let i = 0; i < 12; i++) {
      await inMemoryCandidatureRepository.create(
        makeCandidature({
          userId: new UniqueEntityId('1'),
          opportunity: makeOpportunity({ status: 'CREATED' }),
        }),
      )
    }
    const response = await sut.execute({
      status: 'CREATED',
      userId: '1',
      page: 2,
      perPage: 10,
    })

    expect(response.isRight()).toBe(true)
    expect(response.value?.candidatures).toHaveLength(2)
    expect(inMemoryCandidatureRepository.candidatures).toHaveLength(12)
  })
})
