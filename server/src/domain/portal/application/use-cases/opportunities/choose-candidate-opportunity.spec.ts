import { InMemoryOpportunityRepository } from 'test/repositories/in-memory-opportunity-repository'
import { ChooseCandidateOpportunityUseCase } from './choose-candidate'
import { makeOpportunity } from 'test/factories/make-opportunity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { CandidateAlreadySelectedError } from './errors/candidate-already-selected-error'
import { NotAllowedError } from '@/core/errors/erros/not-allowed-error'
import { InMemoryCandidatureRepository } from 'test/repositories/in-memory-candidature-repository'
import { makeCandidature } from 'test/factories/make-candidature'

let inMemoryOpportunityRepository: InMemoryOpportunityRepository
let inMemoryCandidatureRepository: InMemoryCandidatureRepository
let sut: ChooseCandidateOpportunityUseCase

describe('Choose candidate opportunity', () => {
  beforeEach(() => {
    inMemoryOpportunityRepository = new InMemoryOpportunityRepository()
    inMemoryCandidatureRepository = new InMemoryCandidatureRepository()
    sut = new ChooseCandidateOpportunityUseCase(
      inMemoryOpportunityRepository,
      inMemoryCandidatureRepository,
    )
  })

  it(' should be able choose a candidate', async () => {
    await inMemoryOpportunityRepository.create(
      makeOpportunity(
        {
          authorId: new UniqueEntityId('2'),
        },
        new UniqueEntityId('1'),
      ),
    )
    await inMemoryCandidatureRepository.create(
      makeCandidature({
        opportunityId: new UniqueEntityId('1'),
        userId: new UniqueEntityId('2'),
      }),
    )

    const response = await sut.execute({
      candidateId: '2',
      opportunityId: '1',
    })

    expect(response.isRight()).toBe(true)
  })

  it('should be able choose a candidate only the author of the opportunity', async () => {
    await inMemoryOpportunityRepository.create(
      makeOpportunity({}, new UniqueEntityId('1')),
    )

    const response = await sut.execute({
      candidateId: '1',
      opportunityId: '1',
    })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(NotAllowedError)
  })

  it('should be able choose a with the author like a candidate', async () => {
    await inMemoryOpportunityRepository.create(
      makeOpportunity(
        {
          authorId: new UniqueEntityId('2'),
        },
        new UniqueEntityId('1'),
      ),
    )

    const response = await sut.execute({
      opportunityId: '1',
      candidateId: '2',
    })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(NotAllowedError)
  })

  it('should not be able choose a candidate with opportunity status different created', async () => {
    await inMemoryOpportunityRepository.create(
      makeOpportunity(
        {
          status: 'CLOSED',
          authorId: new UniqueEntityId('2'),
        },
        new UniqueEntityId('1'),
      ),
    )

    const response = await sut.execute({
      candidateId: '1',
      opportunityId: '1',
    })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(CandidateAlreadySelectedError)
  })
})
