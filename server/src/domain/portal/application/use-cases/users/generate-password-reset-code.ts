import { Either, left, right } from '@/core/types/either'
import { IUsersRepository } from '../../repositories/users-repository'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { ISMSProvider } from '@/core/containers/providers/smsProvider/ISMSProvider'
import { IPasswordCodeRepository } from '../../repositories/password-code-repository'
import { PasswordCode } from '@/domain/portal/enterprise/entities/password-code'
import { IDateProvider } from '@/core/containers/providers/dateProvider/IDateProvider'
import { inject, injectable } from 'tsyringe'

type GeneratePasswordResetCodeRequest = {
  cpf: string
}

type GeneratePasswordResetCodeResponse = Either<
  ResourceNotFoundError,
  {
    requestId: string
  }
>

@injectable()
export class GeneratePasswordResetCodeUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
    @inject('SMSProvider')
    private SMSProvider: ISMSProvider,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('PasswordCodeRepository')
    private passwordCodeRepository: IPasswordCodeRepository,
  ) {}

  async execute({
    cpf,
  }: GeneratePasswordResetCodeRequest): Promise<GeneratePasswordResetCodeResponse> {
    const user = await this.userRepository.findByCPF(cpf)

    if (!user) {
      return left(new ResourceNotFoundError())
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString()

    const passwordCode = PasswordCode.create({
      code,
      userId: user.id,
      expiresAt: this.dateProvider.addHours(new Date(), 1),
    })

    await this.SMSProvider.send(user.cellphone, code)
    await this.passwordCodeRepository.create(passwordCode)

    return right({
      requestId: passwordCode.id.toString(),
    })
  }
}
