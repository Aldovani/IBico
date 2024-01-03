import { inject, injectable } from 'tsyringe'
import { PrismaService } from '../services/prisma-service'
import { IPasswordResetRepository } from '@/domain/portal/application/repositories/password-reset-repository'
import { PasswordReset } from '@/domain/portal/enterprise/entities/password-reset'
import { PrismaPasswordResetMapper } from '../mappers/prisma-password-reset-mapper'

@injectable()
export class PrismaPasswordResetRepository implements IPasswordResetRepository {
  constructor(
    @inject('PrismaService')
    private PrismaService: PrismaService,
  ) {}

  async create(passwordReset: PasswordReset): Promise<void> {
    const data = PrismaPasswordResetMapper.toPrisma(passwordReset)

    await this.PrismaService.passwordReset.create({
      data,
    })
  }

  async save(passwordReset: PasswordReset): Promise<void> {
    const data = PrismaPasswordResetMapper.toPrisma(passwordReset)

    await this.PrismaService.passwordReset.update({
      where: {
        id: passwordReset.id.toString(),
      },
      data,
    })
  }

  async findById(passwordResetId: string): Promise<PasswordReset | null> {
    const passwordReset = await this.PrismaService.passwordReset.findFirst({
      where: {
        id: passwordResetId,
      },
    })

    if (!passwordReset) {
      return null
    }

    return PrismaPasswordResetMapper.toDomain(passwordReset)
  }
}
