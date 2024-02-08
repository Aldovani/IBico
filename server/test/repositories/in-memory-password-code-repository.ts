import { IPasswordCodeRepository } from '@/domain/portal/application/repositories/password-code-repository'
import { PasswordCode } from '@/domain/portal/enterprise/entities/password-code'

export class InMemoryPasswordCodeRepository implements IPasswordCodeRepository {
  public passwordCodes: PasswordCode[] = []

  async save(data: PasswordCode): Promise<void> {
    const passwordCodeIndex = this.passwordCodes.findIndex(
      (e) => e.id === data.id,
    )

    if (!passwordCodeIndex) {
      this.passwordCodes.push(data)
    }

    this.passwordCodes[passwordCodeIndex] = data
  }

  async create(passwordCode: PasswordCode): Promise<void> {
    this.passwordCodes.push(passwordCode)
  }

  async findById(passwordCodeId: string): Promise<PasswordCode | null> {
    const passwordCode = this.passwordCodes.find(
      (item) => item.id.toString() === passwordCodeId,
    )

    if (!passwordCode) {
      return null
    }

    return passwordCode
  }
}
