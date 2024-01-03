import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeUser } from 'test/factories/make-user'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { GetProfileUseCase } from './get-profile'

let inMemoryUserRepository: InMemoryUserRepository
let sut: GetProfileUseCase

describe('Get profile', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new GetProfileUseCase(inMemoryUserRepository)
  })

  it('should be able get the profile', async () => {
    await inMemoryUserRepository.create(
      makeUser(
        {
          username: 'Aldovani',
        },
        new UniqueEntityId('1'),
      ),
    )

    const response = await sut.execute({
      username: '1',
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
