import { CreateUserUseCase } from './create-user'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { BcryptEncryptProvider } from '@/core/containers/providers/encryptProvider/implementations/bcrypt-encrypt-provider'
import { UsernameAlreadyExistsError } from './errors/username-already-exists-error'
import { CPFAlreadyExistsError } from './errors/cpf-already-exists-error'

let inMemoryUserRepository: InMemoryUserRepository
let encryptProvider: BcryptEncryptProvider
let sut: CreateUserUseCase

describe('Create a user', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    encryptProvider = new BcryptEncryptProvider()
    sut = new CreateUserUseCase(inMemoryUserRepository, encryptProvider)
  })

  it('should be able create a user', async () => {
    const response = await sut.execute({
      cellphone: '99999999',
      cpf: '00000000000',
      name: 'John doe',
      password: '123456',
      username: 'John_doe',
    })

    expect(response.isRight()).toBe(true)
  })

  it('should not  be able create a user with the same cpf ', async () => {
    await sut.execute({
      cellphone: '99999999',
      cpf: '00000000000',
      name: 'John doe',
      password: '123456',
      username: 'John_doe',
    })

    const response = await sut.execute({
      cellphone: '99999999',
      cpf: '00000000000',
      name: 'John doe',
      password: '123456',
      username: 'John_doe_1',
    })

    expect(response.isLeft()).toBe(true)
    expect(inMemoryUserRepository.users).toHaveLength(1)
    expect(response.value).toBeInstanceOf(CPFAlreadyExistsError)
  })

  it('should not be able create a user with the same username ', async () => {
    await sut.execute({
      cellphone: '99999999',
      cpf: '00000000000',
      name: 'John doe',
      password: '123456',
      username: 'John_doe',
    })

    const response = await sut.execute({
      cellphone: '99999999',
      cpf: '111111111111',
      name: 'John doe',
      password: '123456',
      username: 'John_doe',
    })

    expect(response.isLeft()).toBe(true)
    expect(inMemoryUserRepository.users).toHaveLength(1)
    expect(response.value).toBeInstanceOf(UsernameAlreadyExistsError)
  })

  it('should be able the password has encrypt', async () => {
    await sut.execute({
      cellphone: '99999999',
      cpf: '00000000000',
      name: 'John doe',
      password: '123456',
      username: 'John_doe',
    })

    const isPasswordHashed =
      inMemoryUserRepository.users[0].password !== '1234567'

    expect(isPasswordHashed).toBe(true)
  })
})
