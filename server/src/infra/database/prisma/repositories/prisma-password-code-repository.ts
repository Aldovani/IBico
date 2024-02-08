import { inject, injectable } from 'tsyringe'
import { PrismaService } from '../services/prisma-service'
import { IPasswordCodeRepository } from '@/domain/portal/application/repositories/password-code-repository'
import { PasswordCode } from '@/domain/portal/enterprise/entities/password-code'
import { PrismaPasswordCodeMapper } from '../mappers/prisma-password-code-mapper'

@injectable()
export class PrismaPasswordCodeRepository implements IPasswordCodeRepository {
  constructor(
    @inject('PrismaService')
    private PrismaService: PrismaService,
  ) {}

  async save(data: PasswordCode): Promise<void> {
    const passwordCode = PrismaPasswordCodeMapper.toPrisma(data)

    await this.PrismaService.passwordCode.update({
      data: passwordCode,
      where: { id: passwordCode.id },
    })
  }

  async create(passwordCode: PasswordCode): Promise<void> {
    const data = PrismaPasswordCodeMapper.toPrisma(passwordCode)

    await this.PrismaService.passwordCode.create({
      data,
    })
  }

  async findById(passwordCodeId: string): Promise<PasswordCode | null> {
    const passwordCode = await this.PrismaService.passwordCode.findFirst({
      where: {
        id: passwordCodeId,
      },
    })

    if (!passwordCode) {
      return null
    }

    return PrismaPasswordCodeMapper.toDomain(passwordCode)
  }
}
