import { inject, injectable } from 'tsyringe'
import { PrismaService } from '../services/prisma-service'
import { ISkillsRepository } from '@/domain/portal/application/repositories/skills-repository'
import { Skill } from '@/domain/portal/enterprise/entities/skill'
import { PrismaSkillMapper } from '../mappers/prisma-skill-mapper'

@injectable()
export class PrismaSkillRepository implements ISkillsRepository {
  constructor(
    @inject('PrismaService')
    private PrismaService: PrismaService,
  ) {}

  async create(skill: Skill): Promise<void> {
    const data = PrismaSkillMapper.toPrisma(skill)

    await this.PrismaService.skill.create({
      data,
    })
  }

  async save(skill: Skill): Promise<void> {
    const data = PrismaSkillMapper.toPrisma(skill)
    await this.PrismaService.skill.update({
      data,
      where: {
        id: data.id,
      },
    })
  }

  async delete(skill: Skill): Promise<void> {
    await this.PrismaService.skill.delete({
      where: { id: skill.id.toString() },
    })
  }

  async findById(skillId: string): Promise<Skill | null> {
    const skill = await this.PrismaService.skill.findFirst({
      where: { id: skillId },
    })

    if (!skill) {
      return null
    }
    return PrismaSkillMapper.toDomain(skill)
  }

  async findByName(name: string): Promise<Skill | null> {
    const skill = await this.PrismaService.skill.findFirst({
      where: { name },
    })

    if (!skill) {
      return null
    }

    return PrismaSkillMapper.toDomain(skill)
  }
}
