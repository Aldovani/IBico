import { Either, left, right } from '@/core/types/either'
import { IUsersRepository } from '../../repositories/users-repository'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { User } from '@/domain/portal/enterprise/entities/user'
import { inject, injectable } from 'tsyringe'

type GetProfileRequest = {
  username: string
}

type GetProfileResponse = Either<
  ResourceNotFoundError,
  {
    user: User
    totalServices: number
    totalOpportunities: number
  }
>

@injectable()
export class GetProfileUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}

  async execute({ username }: GetProfileRequest): Promise<GetProfileResponse> {
    const userExists = await this.userRepository.findProfileByUsername(username)

    if (!userExists) {
      return left(new ResourceNotFoundError())
    }

    const { totalOpportunities, totalServices, user } = userExists

    return right({ user, totalOpportunities, totalServices })
  }
}
