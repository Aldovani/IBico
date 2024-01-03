import { Either, right } from '@/core/types/either'
import { IUsersRepository } from '../../repositories/users-repository'
import { User } from '@/domain/portal/enterprise/entities/user'
import { inject, injectable } from 'tsyringe'

type FetchUsersRequest = {
  username: string
  page: number
  perPage: number
}

type FetchUsersResponse = Either<unknown, { users: User[] }>

@injectable()
export class FetchUsersUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}

  async execute({
    username,
    page,
    perPage,
  }: FetchUsersRequest): Promise<FetchUsersResponse> {
    const users = await this.userRepository.findManyByUsername(username, {
      page,
      perPage,
    })

    return right({ users })
  }
}
