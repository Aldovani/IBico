import { Either, left, right } from '@/core/types/either'
import { IPasswordResetRepository } from '../../repositories/password-reset-repository'
import { IPasswordCodeRepository } from '../../repositories/password-code-repository'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { IDateProvider } from '@/core/containers/providers/dateProvider/IDateProvider'
import { PasswordReset } from '@/domain/portal/enterprise/entities/password-reset'
import { ResourceExpiredError } from '@/core/errors/erros/resource-expired-error'
import { inject, injectable } from 'tsyringe'
import { ResourceAlreadyUsedError } from '@/core/errors/erros/resource-already-used-error'

type ValidateCodeRequest = {
  requestId: string
  code: string
}

type ValidateCodeResponse = Either<
  ResourceNotFoundError | ResourceExpiredError,
  {
    requestId: string
  }
>
@injectable()
export class ValidateCodeUseCase {
  constructor(
    @inject('PasswordResetRepository')
    private passwordResetRepository: IPasswordResetRepository,
    @inject('PasswordCodeRepository')
    private passwordCodeRepository: IPasswordCodeRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({
    code,
    requestId,
  }: ValidateCodeRequest): Promise<ValidateCodeResponse> {
    const passwordCode = await this.passwordCodeRepository.findById(requestId)

    if (!passwordCode) {
      return left(new ResourceNotFoundError())
    }
    if (passwordCode.used) {
      return left(new ResourceAlreadyUsedError())
    }

    if (passwordCode.code !== code) {
      return left(new ResourceNotFoundError())
    }

    const codeExpired = this.dateProvider.isBefore(
      passwordCode.expiresAt,
      new Date(),
      'h',
    )

    if (codeExpired) {
      return left(new ResourceExpiredError())
    }

    const passwordReset = PasswordReset.create({
      expiresAt: this.dateProvider.addHours(new Date(), 1),
      requestId: passwordCode.id,
    })

    passwordCode.used = true

    await this.passwordCodeRepository.save(passwordCode)
    await this.passwordResetRepository.create(passwordReset)
    return right({
      requestId: passwordReset.id.toString(),
    })
  }
}
