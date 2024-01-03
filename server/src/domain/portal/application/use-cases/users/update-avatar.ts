import { Either, left, right } from '@/core/types/either'
import { IUsersRepository } from '../../repositories/users-repository'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { User } from '@/domain/portal/enterprise/entities/user'
import { IStorageProvider } from '@/core/containers/providers/storageProvider/IStorageProvider'
import { inject, injectable } from 'tsyringe'

type UpdateAvatarRequest = {
  userId: string
  file: string
}

type UpdateAvatarResponse = Either<ResourceNotFoundError, { user: User }>
@injectable()
export class UpdateAvatarUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({
    userId,
    file,
  }: UpdateAvatarRequest): Promise<UpdateAvatarResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, 'avatar')
    }
    const fileName = await this.storageProvider.save(file, 'avatar')

    user.avatar = fileName

    await this.userRepository.save(user)

    return right({ user })
  }
}
