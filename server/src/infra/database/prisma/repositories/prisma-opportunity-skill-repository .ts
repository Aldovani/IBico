import { inject, injectable } from 'tsyringe'
import { PrismaService } from '../services/prisma-service'
import { IOpportunitySkillsRepository } from '@/domain/portal/application/repositories/opportunity-skills-repository'
import { OpportunitySkill } from '@/domain/portal/enterprise/entities/opportunity-skill'
import { PrismaOpportunitySkillMapper } from '../mappers/prisma-opportunity-skill-mapper'

@injectable()
export class PrismaOpportunitySkillRepository
  implements IOpportunitySkillsRepository
{
  constructor(
    @inject('PrismaService')
    private PrismaService: PrismaService,
  ) {}

  async findManyByOpportunityId(
    opportunityId: string,
  ): Promise<OpportunitySkill[]> {
    const opportunitySkill = await this.PrismaService.opportunitySkill.findMany(
      {
        where: {
          opportunityId,
        },
      },
    )

    return PrismaOpportunitySkillMapper.toDomain(opportunitySkill)
  }

  async createMany(opportunitySkill: OpportunitySkill[]): Promise<void> {
    if (opportunitySkill.length === 0) return

    const data = PrismaOpportunitySkillMapper.toManyPrisma(opportunitySkill)

    await Promise.resolve([
      data.map(
        async (item) =>
          await this.PrismaService.opportunitySkill.create({
            data: item,
          }),
      ),
    ])
  }

  async deleteMany(opportunitySkill: OpportunitySkill[]): Promise<void> {
    if (opportunitySkill.length === 0) return

    const opportunityId = opportunitySkill[0].opportunityId.toString()
    const skillsId = opportunitySkill.map((item) => item.skillId.toString())

    await this.PrismaService.opportunitySkill.deleteMany({
      where: {
        opportunityId,
        skillId: {
          in: skillsId,
        },
      },
    })
  }
}
