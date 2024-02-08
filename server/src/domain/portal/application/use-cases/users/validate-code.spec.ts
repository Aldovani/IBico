import { DayjsDateProvider } from '@/core/containers/providers/dateProvider/implementations/day-js-date-provider'
import { InMemoryPasswordCodeRepository } from 'test/repositories/in-memory-password-code-repository'
import { ValidateCodeUseCase } from './validate-code'
import { InMemoryPasswordResetRepository } from 'test/repositories/in-memory-password-request-repository'
import { PasswordCode } from '@/domain/portal/enterprise/entities/password-code'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceExpiredError } from '@/core/errors/erros/resource-expired-error'
import { ResourceAlreadyUsedError } from '@/core/errors/erros/resource-already-used-error'

let dateProvider: DayjsDateProvider
let inMemoryPasswordCodeRepository: InMemoryPasswordCodeRepository
let inMemoryPasswordResetRepository: InMemoryPasswordResetRepository
let sut: ValidateCodeUseCase

describe('Validate password code', () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider()
    inMemoryPasswordCodeRepository = new InMemoryPasswordCodeRepository()
    inMemoryPasswordResetRepository = new InMemoryPasswordResetRepository()

    sut = new ValidateCodeUseCase(
      inMemoryPasswordResetRepository,
      inMemoryPasswordCodeRepository,
      dateProvider,
    )

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be validate the code', async () => {
    await inMemoryPasswordCodeRepository.create(
      PasswordCode.create({
        code: '123456',
        used: false,
        expiresAt: dateProvider.addHours(new Date(), 1),
        userId: new UniqueEntityId('1'),
      }),
    )

    const passwordCode = inMemoryPasswordCodeRepository.passwordCodes[0]
    const response = await sut.execute({
      code: passwordCode.code,
      requestId: passwordCode.id.toString(),
    })

    expect(response.isRight()).toBe(true)
    expect(response.value).toEqual(
      expect.objectContaining({
        requestId: expect.any(String),
      }),
    )
  })

  it('should not be validate wrong code', async () => {
    await inMemoryPasswordCodeRepository.create(
      PasswordCode.create({
        code: '123456',
        expiresAt: dateProvider.addHours(new Date(), 1),
        used: false,
        userId: new UniqueEntityId('1'),
      }),
    )

    const passwordCode = inMemoryPasswordCodeRepository.passwordCodes[0]

    const response = await sut.execute({
      code: '654321',
      requestId: passwordCode.id.toString(),
    })

    expect(response.isLeft()).toBe(true)
  })

  it('should not be validate the expired code', async () => {
    await inMemoryPasswordCodeRepository.create(
      PasswordCode.create({
        code: '123456',
        expiresAt: new Date(),
        used: false,
        userId: new UniqueEntityId('1'),
      }),
    )
    vi.setSystemTime(dateProvider.addHours(new Date(), 1))
    const passwordCode = inMemoryPasswordCodeRepository.passwordCodes[0]

    const response = await sut.execute({
      code: passwordCode.code,
      requestId: passwordCode.id.toString(),
    })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(ResourceExpiredError)
  })

  it('should not be validate the code already used', async () => {
    await inMemoryPasswordCodeRepository.create(
      PasswordCode.create({
        code: '123456',
        expiresAt: dateProvider.addHours(new Date(), 1),
        used: true,
        userId: new UniqueEntityId('1'),
      }),
    )
    const passwordCode = inMemoryPasswordCodeRepository.passwordCodes[0]

    const response = await sut.execute({
      code: passwordCode.code,
      requestId: passwordCode.id.toString(),
    })
    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(ResourceAlreadyUsedError)
  })
})
