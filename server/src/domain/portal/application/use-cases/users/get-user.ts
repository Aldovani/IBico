import { Either, left, right } from '@/core/types/either'
import { IUsersRepository } from '../../repositories/users-repository'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { User } from '@/domain/portal/enterprise/entities/user'
import { inject, injectable } from 'tsyringe'

type GetUserRequest = {
  userId: string
}

type GetUserResponse = Either<ResourceNotFoundError, { user: User }>

@injectable()
export class GetUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}

  async execute({ userId }: GetUserRequest): Promise<GetUserResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    return right({ user })
  }
}
