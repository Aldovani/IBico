import { inject, injectable } from 'tsyringe'
import { PrismaService } from '../services/prisma-service'
import { IUserSkillsRepository } from '@/domain/portal/application/repositories/user-skills-repository'
import { UserSkill } from '@/domain/portal/enterprise/entities/user-skill'
import { PrismaUserSkillMapper } from '../mappers/prisma-user-skill-mapper'

@injectable()
export class PrismaUserSkillRepository implements IUserSkillsRepository {
  constructor(
    @inject('PrismaService')
    private PrismaService: PrismaService,
  ) {}

  async createMany(userSkills: UserSkill[]): Promise<void> {
    const data = userSkills.map((item) => {
      return {
        skillId: item.skillId.toString(),
        userId: item.userId.toString(),
      }
    })

    await Promise.all([
      data.map(async (item) => {
        await this.PrismaService.userSkill.create({
          data: {
            skillId: item.skillId,
            userId: item.userId,
          },
        })
      }),
    ])
  }

  async deleteMany(userSkill: UserSkill[]): Promise<void> {
    if (userSkill.length === 0) return

    const usersId = userSkill[0].userId.toString()
    const skillsId = userSkill.map((item) => item.skillId.toString())

    await this.PrismaService.userSkill.deleteMany({
      where: {
        userId: usersId,
        skillId: {
          in: skillsId,
        },
      },
    })
  }

  async findManyByUserId(userId: string): Promise<UserSkill[]> {
    const skills = await this.PrismaService.userSkill.findMany({
      where: { userId },
    })

    return skills.map(PrismaUserSkillMapper.toDomain)
  }
}
