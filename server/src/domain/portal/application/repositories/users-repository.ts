import { PaginationParams } from '@/core/repositories/pagination-params'
import { User } from '../../enterprise/entities/user'

export interface IUsersRepository {
  create(user: User): Promise<void>
  delete(user: User): Promise<void>
  save(user: User): Promise<void>
  findByUsername(username: string): Promise<User | null>
  findProfileByUsername(username: string): Promise<{
    user: User
    totalOpportunities: number
    totalServices: number
  } | null>
  findManyByUsername(
    username: string,
    paginationParams: PaginationParams,
  ): Promise<User[]>
  findByCPF(cpf: string): Promise<User | null>
  findById(userId: string): Promise<User | null>
}
