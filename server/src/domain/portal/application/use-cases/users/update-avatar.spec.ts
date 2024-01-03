import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/make-user'
import { InMemoryStorageProvider } from 'test/providers/in-memory-storage-provider'
import { UpdateAvatarUseCase } from './update-avatar'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryStorageProvider: InMemoryStorageProvider
let sut: UpdateAvatarUseCase

describe('Update avatar', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryStorageProvider = new InMemoryStorageProvider()
    sut = new UpdateAvatarUseCase(
      inMemoryUserRepository,
      inMemoryStorageProvider,
    )
  })

  it('should be able update avatar', async () => {
    await inMemoryUserRepository.create(makeUser({}, new UniqueEntityId('1')))
    const response = await sut.execute({
      file: 'Teste',
      userId: '1',
    })

    expect(response.isRight()).toBe(true)
  })
})
