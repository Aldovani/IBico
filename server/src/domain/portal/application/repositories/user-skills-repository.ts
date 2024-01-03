import { UserSkill } from '../../enterprise/entities/user-skill'

export interface IUserSkillsRepository {
  findManyByUserId(userId: string): Promise<UserSkill[]>
  createMany(userId: UserSkill[]): Promise<void>
  deleteMany(userId: UserSkill[]): Promise<void>
}
