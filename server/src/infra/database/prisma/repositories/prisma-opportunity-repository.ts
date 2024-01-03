import { inject, injectable } from 'tsyringe'
import { PrismaService } from '../services/prisma-service'

import {
  IOpportunitiesRepository,
  OpportunityQuery,
} from '@/domain/portal/application/repositories/opportunities-repository'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { Opportunity } from '@/domain/portal/enterprise/entities/opportunity'
import { PrismaOpportunityMapper } from '../mappers/prisma-opportunity-mapper.ts'
import { IOpportunitySkillsRepository } from '@/domain/portal/application/repositories/opportunity-skills-repository'
import { FindManyByUserIdProps } from '@/domain/portal/application/repositories/candidatures-repository'

@injectable()
export class PrismaOpportunityRepository implements IOpportunitiesRepository {
  constructor(
    @inject('PrismaService')
    private PrismaService: PrismaService,
    @inject('OpportunitySkillRepository')
    private OpportunitySkillRepository: IOpportunitySkillsRepository,
  ) {}

  async create(opportunity: Opportunity): Promise<void> {
    const data = PrismaOpportunityMapper.toPrisma(opportunity)

    await this.PrismaService.opportunity.create({
      data,
    })

    await this.OpportunitySkillRepository.createMany(
      opportunity.skills.getItems(),
    )
  }

  async save(opportunity: Opportunity): Promise<void> {
    const data = PrismaOpportunityMapper.toPrisma(opportunity)
    await this.PrismaService.opportunity.update({
      where: {
        id: data.id,
      },
      data,
    })

    await Promise.all([
      this.OpportunitySkillRepository.createMany(
        opportunity.skills.getNewItems(),
      ),

      this.OpportunitySkillRepository.deleteMany(
        opportunity.skills.getRemovedItems(),
      ),
    ])
  }

  async delete(opportunity: Opportunity): Promise<void> {
    console.log({ id: opportunity.id.toString() })
    await this.PrismaService.opportunity.delete({
      where: {
        id: opportunity.id.toString(),
      },
    })
  }

  async findById(opportunityId: string): Promise<Opportunity | null> {
    const opportunity = await this.PrismaService.opportunity.findFirst({
      where: {
        id: opportunityId,
      },
      include: {
        Author: {
          select: {
            avatar: true,
            name: true,
            username: true,
          },
        },
        skills: {
          select: {
            skill: true,
            skillId: true,
            opportunityId: true,
          },
        },
      },
    })

    if (!opportunity) {
      return null
    }

    return PrismaOpportunityMapper.toDomain(opportunity)
  }

  async findMany(
    { amount, local, title, status }: OpportunityQuery,
    { page, perPage }: PaginationParams,
  ): Promise<{ opportunities: Opportunity[]; total: number }> {
    const [opportunities, total] = await Promise.all([
      this.PrismaService.opportunity.findMany({
        where: {
          amount: {
            gte: amount,
          },
          local: {
            contains: local,
          },
          title: { contains: title },
          status,
        },
        include: {
          Author: {
            select: {
              username: true,
              name: true,
              avatar: true,
            },
          },
        },
        take: perPage,
        skip: (page - 1) * perPage,
      }),

      this.PrismaService.opportunity.count({
        where: {
          amount: {
            gte: amount,
          },
          local: {
            contains: local,
          },
          title: { contains: title },
          status,
        },
      }),
    ])
    const opportunitiesToDomain =
      PrismaOpportunityMapper.toManyDomain(opportunities)

    return {
      opportunities: opportunitiesToDomain,
      total,
    }
  }

  async findManyByUserId(
    { status, userId }: FindManyByUserIdProps,
    { page, perPage }: PaginationParams,
  ): Promise<{ opportunities: Opportunity[]; total: number }> {
    const [opportunities, total] = await Promise.all([
      this.PrismaService.opportunity.findMany({
        where: {
          authorId: userId,
          status,
        },
        include: {
          Author: {
            select: {
              username: true,
              name: true,
              avatar: true,
            },
          },
        },

        take: perPage,
        skip: (page - 1) * perPage,
      }),
      this.PrismaService.opportunity.count({
        where: {
          authorId: userId,
          status,
        },
      }),
    ])

    const opportunitiesToDomain =
      PrismaOpportunityMapper.toManyDomain(opportunities)

    return {
      opportunities: opportunitiesToDomain,
      total,
    }
  }
}
