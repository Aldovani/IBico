import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/make-user'
import { GeneratePasswordResetCodeUseCase } from './generate-password-reset-code'
import { DayjsDateProvider } from '@/core/containers/providers/dateProvider/implementations/day-js-date-provider'
import { InMemoryPasswordCodeRepository } from 'test/repositories/in-memory-password-code-repository'
import { InMemorySMSProvider } from 'test/providers/in-memory-sms-provider'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'

let inMemoryUserRepository: InMemoryUserRepository
let dateProvider: DayjsDateProvider
let inMemorySMSProvider: InMemorySMSProvider
let inMemoryPasswordCodeRepository: InMemoryPasswordCodeRepository
let sut: GeneratePasswordResetCodeUseCase

describe('Generate password code', () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider()
    inMemorySMSProvider = new InMemorySMSProvider()
    inMemoryPasswordCodeRepository = new InMemoryPasswordCodeRepository()
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new GeneratePasswordResetCodeUseCase(
      inMemoryUserRepository,
      inMemorySMSProvider,
      dateProvider,
      inMemoryPasswordCodeRepository,
    )
  })

  it('should be able get a code for reset password', async () => {
    await inMemoryUserRepository.create(
      makeUser({
        cpf: '00000000000',
      }),
    )
    const response = await sut.execute({
      cpf: '00000000000',
    })

    expect(response.isRight()).toBe(true)
    expect(response.value).toEqual({
      requestId: expect.any(String),
    })
  })

  it('should not be able get a code for a user non-existent', async () => {
    const response = await sut.execute({
      cpf: '00000000000',
    })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
