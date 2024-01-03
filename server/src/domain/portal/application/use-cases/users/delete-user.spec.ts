import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { DeleteUserUseCase } from './delete-user'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeUser } from 'test/factories/make-user'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'

let inMemoryUserRepository: InMemoryUserRepository
let sut: DeleteUserUseCase

describe('Delete a user', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new DeleteUserUseCase(inMemoryUserRepository)
  })

  it('should be able delete a user', async () => {
    await inMemoryUserRepository.create(makeUser({}, new UniqueEntityId('1')))

    const response = await sut.execute({
      userId: '1',
    })

    expect(response.isRight()).toBe(true)
  })

  it('should not be able delete a non-exists user', async () => {
    const response = await sut.execute({
      userId: '1',
    })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
