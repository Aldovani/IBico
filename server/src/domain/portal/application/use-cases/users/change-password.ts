import { Either, left, right } from '@/core/types/either'
import { IPasswordResetRepository } from '../../repositories/password-reset-repository'
import { IPasswordCodeRepository } from '../../repositories/password-code-repository'
import { IDateProvider } from '@/core/containers/providers/dateProvider/IDateProvider'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { IUsersRepository } from '../../repositories/users-repository'
import { IEncryptProvider } from '@/core/containers/providers/encryptProvider/IEncryptProvider'
import { ResourceExpiredError } from '@/core/errors/erros/resource-expired-error'
import { inject, injectable } from 'tsyringe'

type ChangePasswordRequest = {
  requestId: string
  password: string
}

type ChangePasswordResponse = Either<
  ResourceExpiredError | ResourceNotFoundError,
  null
>
@injectable()
export class ChangePasswordUseCase {
  constructor(
    @inject('PasswordResetRepository')
    private passwordResetRepository: IPasswordResetRepository,
    @inject('PasswordCodeRepository')
    private passwordCodeRepository: IPasswordCodeRepository,
    @inject('UserRepository')
    private userRepository: IUsersRepository,
    @inject('EncryptProvider')
    private encryptProvider: IEncryptProvider,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({
    requestId,
    password,
  }: ChangePasswordRequest): Promise<ChangePasswordResponse> {
    const passwordReset = await this.passwordResetRepository.findById(requestId)

    if (!passwordReset) {
      return left(new ResourceNotFoundError())
    }

    const requestExpired = this.dateProvider.compareIfAfter(
      new Date(),
      passwordReset.expiresAt,
    )

    if (requestExpired) {
      return left(new ResourceExpiredError())
    }

    const passwordCode = await this.passwordCodeRepository.findById(
      passwordReset.requestId.toString(),
    )

    if (!passwordCode) {
      return left(new ResourceNotFoundError())
    }

    const user = await this.userRepository.findById(
      passwordCode.userId.toString(),
    )

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const passwordHashed = await this.encryptProvider.hash(password)

    passwordReset.used = true
    user.password = passwordHashed

    await this.userRepository.save(user)
    await this.passwordResetRepository.save(passwordReset)

    return right(null)
  }
}
