import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeUser } from 'test/factories/make-user'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { GetUserUseCase } from './get-user'

let inMemoryUserRepository: InMemoryUserRepository
let sut: GetUserUseCase

describe('Get User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new GetUserUseCase(inMemoryUserRepository)
  })

  it('should be able get a user', async () => {
    await inMemoryUserRepository.create(
      makeUser(
        {
          name: 'Aldovani',
        },
        new UniqueEntityId('1'),
      ),
    )

    const response = await sut.execute({
      username: 'aldovani',
    })

    if (response.isRight()) {
      expect(response.isRight()).toBe(true)
      expect(response.value.user.name).toBe('Aldovani')
    }
  })

  it('should not be able delete a non-exists user', async () => {
    const response = await sut.execute({
      username: '1',
    })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
