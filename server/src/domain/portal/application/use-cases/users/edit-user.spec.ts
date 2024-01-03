import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { BcryptEncryptProvider } from '@/core/containers/providers/encryptProvider/implementations/bcrypt-encrypt-provider'
import { EditUserUseCase } from './edit-user'
import { InMemorySkillRepository } from 'test/repositories/in-memory-skill-repository'
import { InMemoryUserSkillRepository } from 'test/repositories/in-memory-user-skill-repository'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { makeUser } from 'test/factories/make-user'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { UsernameAlreadyExistsError } from './errors/username-already-exists-error'
import { CPFAlreadyExistsError } from './errors/cpf-already-exists-error'
import { InvalidCredencialError } from './errors/invalid-credencial-error'

let inMemoryUserRepository: InMemoryUserRepository
let encryptProvider: BcryptEncryptProvider
let skillRepository: InMemorySkillRepository
let userSkillRepository: InMemoryUserSkillRepository
let sut: EditUserUseCase

describe('Edit a user', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    encryptProvider = new BcryptEncryptProvider()
    skillRepository = new InMemorySkillRepository()
    userSkillRepository = new InMemoryUserSkillRepository()
    sut = new EditUserUseCase(
      inMemoryUserRepository,
      encryptProvider,
      userSkillRepository,
      skillRepository,
    )
  })

  it('should be able edit a user', async () => {
    await inMemoryUserRepository.create(makeUser({}, new UniqueEntityId('1')))

    const response = await sut.execute({
      active: true,
      cellphone: '00000000',
      cpf: '0000000000',
      name: 'John don',
      skills: [],
      userId: '1',
      username: '',
    })
    const user = inMemoryUserRepository.users[0]
    expect(response.isRight()).toBe(true)
    expect(user.active).toEqual(true)
  })

  it('should not be able change the cpf existent', async () => {
    await inMemoryUserRepository.create(makeUser({}, new UniqueEntityId('1')))
    await inMemoryUserRepository.create(
      makeUser(
        {
          cpf: '11111111111',
        },
        new UniqueEntityId(),
      ),
    )

    const response = await sut.execute({
      active: true,
      cellphone: '00000000',
      cpf: '11111111111',
      name: 'John don',
      skills: [],
      userId: '1',
      username: '',
    })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(CPFAlreadyExistsError)
  })

  it('should not be able change the username existent', async () => {
    await inMemoryUserRepository.create(makeUser({}, new UniqueEntityId('1')))
    await inMemoryUserRepository.create(
      makeUser(
        {
          username: 'username_test',
        },
        new UniqueEntityId(),
      ),
    )

    const response = await sut.execute({
      active: true,
      cellphone: '00000000',
      cpf: '',
      name: 'John don',
      skills: [],
      userId: '1',
      username: 'username_test',
    })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(UsernameAlreadyExistsError)
  })

  it('should not be able edit a non-exists user', async () => {
    const response = await sut.execute({
      active: true,
      cellphone: '00000000',
      cpf: '0000000000',
      name: 'John don',
      skills: [],
      userId: '1',
      username: '',
    })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should be able change the password', async () => {
    const passwordHashed = await encryptProvider.hash('1234567')

    await inMemoryUserRepository.create(
      makeUser(
        {
          password: passwordHashed,
        },
        new UniqueEntityId('1'),
      ),
    )

    const response = await sut.execute({
      active: true,
      cellphone: '00000000',
      cpf: '0000000000',
      name: 'John don',
      skills: [],
      userId: '1',
      username: '',
      currentPassword: '1234567',
      newPassword: 'NovaSenha',
    })

    const newPassword = inMemoryUserRepository.users[0].password

    const isPasswordMathWithPasswordHashed = await encryptProvider.compare(
      'NovaSenha',
      newPassword,
    )

    expect(isPasswordMathWithPasswordHashed).toBe(true)
    expect(response.isRight()).toBe(true)
  })

  it('should not able edit the password with invalid currentPassword', async () => {
    const currentPasswordHashed = await encryptProvider.hash('123456')

    await inMemoryUserRepository.create(
      makeUser(
        {
          password: currentPasswordHashed,
        },
        new UniqueEntityId('1'),
      ),
    )

    const response = await sut.execute({
      active: true,
      cellphone: '00000000',
      cpf: '0000000000',
      name: 'John don',
      skills: [],
      userId: '1',
      username: 'aldovani',
      currentPassword: '654321',
      newPassword: '123456789',
    })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(InvalidCredencialError)
  })
})
