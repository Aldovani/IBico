import { InMemoryCandidatureRepository } from 'test/repositories/in-memory-candidature-repository'
import { GetCandidatureUseCase } from './get-candidature'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeCandidature } from 'test/factories/make-candidature'

let inMemoryCandidatureRepository: InMemoryCandidatureRepository
let sut: GetCandidatureUseCase

describe('Get candidature', () => {
  beforeEach(() => {
    inMemoryCandidatureRepository = new InMemoryCandidatureRepository()
    sut = new GetCandidatureUseCase(inMemoryCandidatureRepository)
  })

  it('should not be possible get a candidate a opportunity existent', async () => {
    const response = await sut.execute({ opportunityId: '', userId: '' })

    if (response.isLeft()) {
      expect(response.value).toBeInstanceOf(ResourceNotFoundError)
    }
  })

  it('should be able to get if user is a candidate', async () => {
    await inMemoryCandidatureRepository.create(
      makeCandidature({
        opportunityId: new UniqueEntityId('1'),
        userId: new UniqueEntityId('1'),
      }),
    )
    const response = await sut.execute({ opportunityId: '1', userId: '1' })

    expect(response.value).toEqual({ isCandidate: true })
  })
})
