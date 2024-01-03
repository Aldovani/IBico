import { Either, left, right } from '@/core/types/either'
import { User } from '@/domain/portal/enterprise/entities/user'
import { IUsersRepository } from '../../repositories/users-repository'
import { IEncryptProvider } from '@/core/containers/providers/encryptProvider/IEncryptProvider'
import { CPFAlreadyExistsError } from './errors/cpf-already-exists-error'
import { UsernameAlreadyExistsError } from './errors/username-already-exists-error'
import { inject, injectable } from 'tsyringe'
import { UserSkillList } from '@/domain/portal/enterprise/entities/user-skill-list'

type CreateUserRequest = {
  username: string
  name: string
  cpf: string
  password: string
  cellphone: string
}

type CreateUserResponse = Either<
  UsernameAlreadyExistsError | CPFAlreadyExistsError,
  {
    user: User
  }
>

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
    @inject('EncryptProvider')
    private encryptProvider: IEncryptProvider,
  ) {}

  async execute({
    cellphone,
    cpf,
    name,
    password,
    username,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const usernameAlreadyExists =
      await this.userRepository.findByUsername(username)

    if (usernameAlreadyExists) {
      return left(new UsernameAlreadyExistsError(username))
    }

    const cpfAlreadyExists = await this.userRepository.findByCPF(cpf)

    if (cpfAlreadyExists) {
      return left(new CPFAlreadyExistsError(cpf))
    }

    const passwordHashed = await this.encryptProvider.hash(password)

    const user = User.create({
      cellphone,
      cpf,
      name,
      password: passwordHashed,
      username,
      skills: new UserSkillList(),
    })

    await this.userRepository.create(user)

    return right({
      user,
    })
  }
}
