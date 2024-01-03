import { describe, it, beforeEach, expect, vi, afterEach } from 'vitest'
import { DayjsDateProvider } from '@/core/containers/providers/dateProvider/implementations/day-js-date-provider'
import { InMemoryPasswordCodeRepository } from 'test/repositories/in-memory-password-code-repository'
import { InMemoryPasswordResetRepository } from 'test/repositories/in-memory-password-request-repository'
import { PasswordCode } from '@/domain/portal/enterprise/entities/password-code'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ChangePasswordUseCase } from './change-password'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { BcryptEncryptProvider } from '@/core/containers/providers/encryptProvider/implementations/bcrypt-encrypt-provider'
import { makeUser } from 'test/factories/make-user'
import { PasswordReset } from '@/domain/portal/enterprise/entities/password-reset'
import { ResourceExpiredError } from '@/core/errors/erros/resource-expired-error'

let dateProvider: DayjsDateProvider
let encryptProvider: BcryptEncryptProvider
let inMemoryPasswordCodeRepository: InMemoryPasswordCodeRepository
let inMemoryPasswordResetRepository: InMemoryPasswordResetRepository
let inMemoryUserRepository: InMemoryUserRepository
let sut: ChangePasswordUseCase

describe('Change password', () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider()
    encryptProvider = new BcryptEncryptProvider()
    inMemoryPasswordCodeRepository = new InMemoryPasswordCodeRepository()
    inMemoryPasswordResetRepository = new InMemoryPasswordResetRepository()
    inMemoryUserRepository = new InMemoryUserRepository()

    sut = new ChangePasswordUseCase(
      inMemoryPasswordResetRepository,
      inMemoryPasswordCodeRepository,
      inMemoryUserRepository,
      encryptProvider,
      dateProvider,
    )

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able change the password', async () => {
    await inMemoryUserRepository.create(makeUser({}, new UniqueEntityId('1')))
    await inMemoryPasswordCodeRepository.create(
      PasswordCode.create({
        code: '123456',
        expiresAt: dateProvider.addHours(new Date(), 1),
        userId: new UniqueEntityId('1'),
      }),
    )
    const passwordCode = inMemoryPasswordCodeRepository.passwordCodes[0]

    await inMemoryPasswordResetRepository.create(
      PasswordReset.create({
        expiresAt: dateProvider.addHours(new Date(), 1),
        requestId: passwordCode.id,
      }),
    )

    const passwordReset = inMemoryPasswordResetRepository.passwordResets[0]

    const response = await sut.execute({
      password: '123456',
      requestId: passwordReset.id.toString(),
    })

    expect(response.isRight()).toBe(true)
    expect(inMemoryPasswordResetRepository.passwordResets[0].used).toBe(true)
  })

  it('should not change the password with expired requestId', async () => {
    await inMemoryUserRepository.create(makeUser({}, new UniqueEntityId('1')))
    await inMemoryPasswordCodeRepository.create(
      PasswordCode.create({
        code: '123456',
        expiresAt: dateProvider.addHours(new Date(), 1),
        userId: new UniqueEntityId('1'),
      }),
    )
    const passwordCode = inMemoryPasswordCodeRepository.passwordCodes[0]

    await inMemoryPasswordResetRepository.create(
      PasswordReset.create({
        expiresAt: dateProvider.addHours(new Date(), 1),
        requestId: passwordCode.id,
      }),
    )

    const passwordReset = inMemoryPasswordResetRepository.passwordResets[0]

    vi.setSystemTime(dateProvider.addHours(new Date(), 5))

    const response = await sut.execute({
      password: '123456',
      requestId: passwordReset.id.toString(),
    })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(ResourceExpiredError)
  })
})
