import { PasswordCode as PrismaPasswordCode } from '@prisma/client'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { PasswordCode } from '@/domain/portal/enterprise/entities/password-code'

export class PrismaPasswordCodeMapper {
  static toDomain(raw: PrismaPasswordCode): PasswordCode {
    return PasswordCode.create(
      {
        code: raw.code,
        userId: new UniqueEntityId(raw.userId),
        expiresAt: raw.expiresAt,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(raw: PasswordCode): PrismaPasswordCode {
    return {
      code: raw.code,
      createdAt: raw.createdAt,
      expiresAt: raw.expiresAt,
      id: raw.id.toString(),
      userId: raw.userId.toString(),
    }
  }
}
