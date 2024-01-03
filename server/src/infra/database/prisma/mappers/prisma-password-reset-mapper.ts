import { PasswordReset as PrismaPasswordReset } from '@prisma/client'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { PasswordReset } from '@/domain/portal/enterprise/entities/password-reset'

export class PrismaPasswordResetMapper {
  static toDomain(raw: PrismaPasswordReset): PasswordReset {
    return PasswordReset.create(
      {
        expiresAt: raw.expiresAt,
        createdAt: raw.createdAt,
        requestId: new UniqueEntityId(raw.passwordCodeId),
        used: raw.used,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(raw: PasswordReset): PrismaPasswordReset {
    return {
      createdAt: raw.createdAt,
      expiresAt: raw.expiresAt,
      id: raw.id.toString(),
      passwordCodeId: raw.requestId.toString(),
      used: raw.used,
    }
  }
}
