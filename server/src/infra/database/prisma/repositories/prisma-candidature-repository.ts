import { inject, injectable } from 'tsyringe'
import { PrismaService } from '../services/prisma-service'

import {
  FindByUserIdAndOpportunityIdProps,
  FindManyByUserIdProps,
  ICandidaturesRepository,
} from '@/domain/portal/application/repositories/candidatures-repository'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { Candidature } from '@/domain/portal/enterprise/entities/candidature'
import { PrismaCandidatureMapper } from '../mappers/prisma-candidature-mapper'
import { Candidate } from '@/domain/portal/enterprise/entities/candidate'

type PrismaCandidates = {
  name: string
  id: string
  cellphone: string
  username: string
  avatar: string | null
  rating: number | null
}

@injectable()
export class PrismaCandidatureRepository implements ICandidaturesRepository {
  constructor(
    @inject('PrismaService')
    private PrismaService: PrismaService,
  ) {}

  async create(candidature: Candidature): Promise<void> {
    const data = PrismaCandidatureMapper.toPrisma(candidature)
    await this.PrismaService.candidature.create({
      data,
    })
  }

  async save(candidature: Candidature): Promise<void> {
    const data = PrismaCandidatureMapper.toPrisma(candidature)

    await this.PrismaService.candidature.update({
      data,
      where: {
        id: candidature.id.toString(),
      },
    })
  }

  async delete(candidature: Candidature): Promise<void> {
    await this.PrismaService.candidature.delete({
      where: {
        id: candidature.id.toString(),
      },
    })
  }

  async findById(candidatureId: string): Promise<Candidature | null> {
    const candidature = await this.PrismaService.candidature.findFirst({
      where: {
        id: candidatureId,
      },
    })

    if (!candidature) {
      return null
    }

    return PrismaCandidatureMapper.toDomain(candidature)
  }

  async findManyByUserId(
    { status, userId }: FindManyByUserIdProps,
    { page, perPage }: PaginationParams,
  ): Promise<{ candidatures: Candidature[]; total: number }> {
    const [candidatures, total] = await Promise.all([
      this.PrismaService.candidature.findMany({
        where: {
          userId,
          Opportunity: {
            status,
          },
        },
        include: {
          Opportunity: {
            include: {
              Author: {
                select: {
                  avatar: true,
                  name: true,
                  username: true,
                },
              },
            },
          },
        },
        take: perPage,
        skip: (page - 1) * perPage,
      }),
      this.PrismaService.candidature.count({
        where: {
          userId,
          Opportunity: {
            status,
          },
        },
      }),
    ])

    const candidaturesToDomain =
      PrismaCandidatureMapper.toManyDomain(candidatures)

    return {
      candidatures: candidaturesToDomain,
      total,
    }
  }

  async findManyByOpportunityId(
    opportunityId: string,
    { page, perPage }: PaginationParams,
  ): Promise<{ candidates: Candidate[]; total: number }> {
    const [candidates, total] = await Promise.all([
      this.PrismaService.$queryRaw`
    SELECT c.*, U.name, U.username,U.avatar,U.cellphone,U.id,
       (SELECT AVG(rating) from reviews as R inner join opportunities as  O on O.candidateId = U.id where R.authorId != U.id and R.opportunityId= O.id ) as rating
        FROM candidatures as C
    inner join users as U on U.id = c.userId
    where opportunityId= ${opportunityId}
    group By U.username
    LIMIT ${perPage} OFFSET ${page - 1} * ${perPage};

    `,
      this.PrismaService.candidature.count({
        where: {
          opportunityId,
        },
      }),
    ])

    const candidatesToDomain = PrismaCandidatureMapper.toManyCandidatesDomain(
      candidates as PrismaCandidates[],
    )

    return {
      candidates: candidatesToDomain,
      total,
    }
  }

  async findByUserIdAndOpportunityId({
    opportunityId,
    userId,
  }: FindByUserIdAndOpportunityIdProps): Promise<Candidature | null> {
    const candidature = await this.PrismaService.candidature.findFirst({
      where: {
        opportunityId,
        userId,
      },
    })

    if (!candidature) {
      return null
    }

    return PrismaCandidatureMapper.toDomain(candidature)
  }
}
