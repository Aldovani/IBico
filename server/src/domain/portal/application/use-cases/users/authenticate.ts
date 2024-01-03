import { Either, left, right } from '@/core/types/either'
import { IUsersRepository } from '../../repositories/users-repository'
import { User } from '@/domain/portal/enterprise/entities/user'
import { IEncryptProvider } from '@/core/containers/providers/encryptProvider/IEncryptProvider'
import { InvalidCredencialError } from './errors/invalid-credencial-error'
import { inject, injectable } from 'tsyringe'

type AuthenticateRequest = {
  password: string
  cpf: string
}

type AuthenticateResponse = Either<InvalidCredencialError, { user: User }>

@injectable()
export class AuthenticateUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
    @inject('EncryptProvider')
    private encryptProvider: IEncryptProvider,
  ) {}

  async execute({
    cpf,
    password,
  }: AuthenticateRequest): Promise<AuthenticateResponse> {
    const user = await this.userRepository.findByCPF(cpf)

    if (!user) {
      return left(new InvalidCredencialError())
    }

    const isPasswordMathWithPasswordHashed = await this.encryptProvider.compare(
      password,
      user.password,
    )

    if (!isPasswordMathWithPasswordHashed) {
      return left(new InvalidCredencialError())
    }

    return right({ user })
  }
}
