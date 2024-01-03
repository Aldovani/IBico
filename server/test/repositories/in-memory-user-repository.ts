import { PaginationParams } from '@/core/repositories/pagination-params'
import { IUsersRepository } from '@/domain/portal/application/repositories/users-repository'
import { Review } from '@/domain/portal/enterprise/entities/review'
import { User } from '@/domain/portal/enterprise/entities/user'

export class InMemoryUserRepository implements IUsersRepository {
  public users: User[] = []

  async create(user: User): Promise<void> {
    this.users.push(user)
  }

  async save(user: User): Promise<void> {
    const userIndex = this.users.findIndex(
      (item) => item.id.toString() === user.id.toString(),
    )
    this.users[userIndex] = user
  }

  async delete(user: User): Promise<void> {
    const users = this.users.filter(
      (item) => item.id.toString() !== user.id.toString(),
    )

    this.users = users
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = this.users.find((item) => item.username === username)

    if (!user) {
      return null
    }

    return user
  }

  async findManyByUsername(
    username: string,
    { page, perPage }: PaginationParams,
  ): Promise<User[]> {
    const users = this.users
      .filter((item) => item.username.includes(username))
      .slice((page - 1) * perPage, page * perPage)

    return users
  }

  async findByCPF(cpf: string): Promise<User | null> {
    const user = this.users.find((item) => item.cpf === cpf)

    if (!user) {
      return null
    }

    return user
  }

  async findById(userId: string): Promise<User | null> {
    const user = this.users.find((item) => item.id.toString() === userId)

    if (!user) {
      return null
    }

    return user
  }

  async findProfileByUsername(username: string): Promise<{
    user: User
    totalOpportunities: number
    totalServices: number
    reviews: Review[]
  } | null> {
    const user = this.users.find((user) => user.username.includes(username))

    if (!user) {
      return null
    }

    return {
      reviews: [],
      totalOpportunities: 0,
      totalServices: 0,
      user,
    }
  }
}
