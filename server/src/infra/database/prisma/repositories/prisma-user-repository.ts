import { PaginationParams } from '@/core/repositories/pagination-params'
import { IUsersRepository } from '@/domain/portal/application/repositories/users-repository'
import { User } from '@/domain/portal/enterprise/entities/user'
import { inject, injectable } from 'tsyringe'
import { PrismaService } from '../services/prisma-service'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'
import { IUserSkillsRepository } from '@/domain/portal/application/repositories/user-skills-repository'

@injectable()
export class PrismaUserRepository implements IUsersRepository {
  constructor(
    @inject('PrismaService')
    private PrismaService: PrismaService,
    @inject('UserSkillRepository')
    private UserSkillRepository: IUserSkillsRepository,
  ) {}

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user)

    await this.PrismaService.user.create({
      data,
    })
  }

  async delete(user: User): Promise<void> {
    await this.PrismaService.user.delete({
      where: {
        id: user.id.toValue(),
      },
    })
  }

  async save(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user)

    await this.PrismaService.user.update({
      data,
      where: {
        id: data.id,
      },
    })

    await Promise.all([
      this.UserSkillRepository.createMany(user.skills.getNewItems()),
      this.UserSkillRepository.deleteMany(user.skills.getRemovedItems()),
    ])
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.PrismaService.user.findFirst({
      where: {
        username,
      },
      include: {
        skills: { include: { Skill: {} } },
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findProfileByUsername(username: string): Promise<{
    user: User
    totalOpportunities: number
    totalServices: number
  } | null> {
    const data = await Promise.all([
      this.PrismaService.user.findFirst({
        where: {
          username,
        },
        include: {
          skills: { include: { Skill: {} } },
          _count: {
            select: { AuthorOpportunity: true, CandidateOpportunity: true },
          },
        },
      }),
      this.PrismaService.$queryRaw<[{ rating: number | null }]>`
  SELECT  (SELECT AVG(rating) from reviews as R inner join opportunities as  O on O.candidateId = U.id where R.authorId != U.id and R.opportunityId= O.id ) as
   rating FROM users as U INNER JOIN opportunities as O
   on O.candidateId= U.Id
    where u.username = ${username}`,
    ])

    if (!data[0]) {
      return null
    }
    const [user, userRating] = data

    const userToDomain = PrismaUserMapper.toDomain(user)

    userToDomain.rating = userRating[0]?.rating || 10

    return {
      user: userToDomain,
      totalOpportunities: user._count.AuthorOpportunity,
      totalServices: user._count.CandidateOpportunity,
    }
  }

  async findManyByUsername(
    username: string,
    { page, perPage }: PaginationParams,
  ): Promise<User[]> {
    const users = await this.PrismaService.user.findMany({
      where: {
        username: {
          contains: username,
        },
      },
      take: perPage,
      skip: (page - 1) * perPage,
    })

    return users.map(PrismaUserMapper.toManyDomain)
  }

  async findByCPF(cpf: string): Promise<User | null> {
    const user = await this.PrismaService.user.findFirst({
      where: {
        cpf,
      },
      include: {
        skills: { include: { Skill: {} } },
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findById(userId: string): Promise<User | null> {
    const user = await this.PrismaService.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        skills: { include: { Skill: {} } },
      },
    })

    if (!user) {
      return null
    }
    return PrismaUserMapper.toDomain(user)
  }
}
