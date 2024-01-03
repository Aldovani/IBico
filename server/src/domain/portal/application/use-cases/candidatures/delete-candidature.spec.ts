import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryCandidatureRepository } from 'test/repositories/in-memory-candidature-repository'
import { DeleteCandidatureUseCase } from './delete-candidature'
import { makeCandidature } from 'test/factories/make-candidature'
import { NotAllowedError } from '@/core/errors/erros/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'

let inMemoryCandidatureRepository: InMemoryCandidatureRepository
let sut: DeleteCandidatureUseCase

describe('Delete a candidature', () => {
  beforeEach(() => {
    inMemoryCandidatureRepository = new InMemoryCandidatureRepository()
    sut = new DeleteCandidatureUseCase(inMemoryCandidatureRepository)
  })

  it('Should be able to delete a candidature', async () => {
    await inMemoryCandidatureRepository.create(
      makeCandidature(
        {
          userId: new UniqueEntityId('1'),
        },
        new UniqueEntityId('1'),
      ),
    )
    const response = await sut.execute({ candidatureId: '1', userId: '1' })

    expect(response.isRight()).toBe(true)
    expect(inMemoryCandidatureRepository.candidatures).toHaveLength(0)
  })

  it('Should not be able to delete a candidature the another user', async () => {
    await inMemoryCandidatureRepository.create(
      makeCandidature({}, new UniqueEntityId('1')),
    )
    const response = await sut.execute({ candidatureId: '1', userId: '1' })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(NotAllowedError)
    expect(inMemoryCandidatureRepository.candidatures).toHaveLength(1)
  })

  it('Should not be able to delete a non-existent candidature', async () => {
    const response = await sut.execute({ candidatureId: '1', userId: '1' })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(ResourceNotFoundError)
    expect(inMemoryCandidatureRepository.candidatures).toHaveLength(0)
  })
})
