import { IUserSkillsRepository } from '@/domain/portal/application/repositories/user-skills-repository'
import { UserSkill } from '@/domain/portal/enterprise/entities/user-skill'

export class InMemoryUserSkillRepository implements IUserSkillsRepository {
  public userSkills: UserSkill[] = []

  async createMany(userSkill: UserSkill[]): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async deleteMany(userSkill: UserSkill[]): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findManyByUserId(userId: string): Promise<UserSkill[]> {
    const skills = this.userSkills.filter(
      (item) => item.userId.toString() === userId,
    )

    return skills
  }
}
