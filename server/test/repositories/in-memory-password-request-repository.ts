import { IPasswordResetRepository } from '@/domain/portal/application/repositories/password-reset-repository'
import { PasswordReset } from '@/domain/portal/enterprise/entities/password-reset'

export class InMemoryPasswordResetRepository
  implements IPasswordResetRepository
{
  public passwordResets: PasswordReset[] = []
  async create(passwordReset: PasswordReset): Promise<void> {
    this.passwordResets.push(passwordReset)
  }

  async findById(passwordResetId: string): Promise<PasswordReset | null> {
    const passwordReset = this.passwordResets.find(
      (item) => item.id.toString() === passwordResetId,
    )

    if (!passwordReset) {
      return null
    }

    return passwordReset
  }

  async save(passwordReset: PasswordReset): Promise<void> {
    const passwordResetIndex = this.passwordResets.findIndex(
      (item) => item.id === passwordReset.id,
    )

    this.passwordResets[passwordResetIndex] = passwordReset
  }
}
