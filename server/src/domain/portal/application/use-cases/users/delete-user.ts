import { Either, left, right } from '@/core/types/either'
import { ResourceAlreadyExists } from '@/core/errors/erros/resource-already-exists'
import { IUsersRepository } from '../../repositories/users-repository'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { inject, injectable } from 'tsyringe'

type DeleteUserRequest = {
  userId: string
}

type DeleteUserResponse = Either<ResourceAlreadyExists, null>

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}

  async execute({ userId }: DeleteUserRequest): Promise<DeleteUserResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    await this.userRepository.delete(user)

    return right(null)
  }
}
