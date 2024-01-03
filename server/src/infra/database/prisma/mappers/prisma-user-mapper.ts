import { User as PrismaUser, Prisma } from '@prisma/client'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/portal/enterprise/entities/user'
import { UserSkillList } from '@/domain/portal/enterprise/entities/user-skill-list'
import { UserSkill } from '@/domain/portal/enterprise/entities/user-skill'

type PrismaUserSkill = PrismaUser & {
  skills: ({
    Skill: {
      id: string
      name: string
    }
  } & {
    skillId: string
    userId: string
  })[]
}

export class PrismaUserMapper {
  static toManyDomain(raw: PrismaUser): User {
    return User.create(
      {
        cellphone: raw.cellphone,
        cpf: raw.cpf,
        name: raw.name,
        password: raw.password,
        username: raw.username,
        active: raw.active,
        avatar: raw.avatar,
        createdAt: raw.createdAt,
        rating: raw.rating,
        skills: new UserSkillList(),
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toDomain(raw: PrismaUserSkill): User {
    return User.create(
      {
        cellphone: raw.cellphone,
        cpf: raw.cpf,
        name: raw.name,
        password: raw.password,
        username: raw.username,
        active: raw.active,
        avatar: raw.avatar,
        createdAt: raw.createdAt,
        rating: raw.rating,
        skills: new UserSkillList(
          raw.skills.map((item) =>
            UserSkill.create({
              skillId: new UniqueEntityId(item.skillId),
              userId: new UniqueEntityId(item.userId),
              name: item.Skill.name,
            }),
          ),
        ),
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      active: user.active,
      avatar: user.avatar,
      cellphone: user.cellphone,
      cpf: user.cpf,
      createdAt: user.createdAt,
      name: user.name,
      password: user.password,
      rating: user.rating,
      username: user.username,
    }
  }
}
