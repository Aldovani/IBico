import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/make-user'
import { AuthenticateUseCase } from './authenticate'
import { BcryptEncryptProvider } from '@/core/containers/providers/encryptProvider/implementations/bcrypt-encrypt-provider'
import { InvalidCredencialError } from './errors/invalid-credencial-error'

let inMemoryUserRepository: InMemoryUserRepository
let encryptProvider: BcryptEncryptProvider
let sut: AuthenticateUseCase

describe('Authenticate', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    encryptProvider = new BcryptEncryptProvider()
    sut = new AuthenticateUseCase(inMemoryUserRepository, encryptProvider)
  })

  it('should be able authenticate', async () => {
    const passwordHashed = await encryptProvider.hash('123456')
    await inMemoryUserRepository.create(
      makeUser({
        cpf: '00000000000',
        password: passwordHashed,
      }),
    )

    const response = await sut.execute({
      cpf: '00000000000',
      password: '123456',
    })

    expect(response.isRight()).toBe(true)
  })

  it('should not be able authenticate with invalidated credential', async () => {
    const response = await sut.execute({
      cpf: '00000000000',
      password: '123456',
    })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(InvalidCredencialError)
  })
})
