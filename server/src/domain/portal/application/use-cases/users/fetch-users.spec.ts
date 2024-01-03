import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { FetchUsersUseCase } from './fetch-users'
import { makeUser } from 'test/factories/make-user'

let inMemoryUserRepository: InMemoryUserRepository
let sut: FetchUsersUseCase

describe('Fetch users', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new FetchUsersUseCase(inMemoryUserRepository)
  })

  it('should be able fetch users', async () => {
    for (let index = 0; index < 10; index++) {
      await inMemoryUserRepository.create(
        makeUser({
          username: `user_${index}`,
        }),
      )
    }

    const response = await sut.execute({
      username: 'user_',
      page: 1,
      perPage: 10,
    })

    if (response.isRight()) {
      expect(response.isRight()).toBe(true)
      expect(response.value.users).toHaveLength(10)
    }
  })
})
