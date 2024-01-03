import { PasswordReset } from '../../enterprise/entities/password-reset'

export interface IPasswordResetRepository {
  create(passwordReset: PasswordReset): Promise<void>
  save(passwordReset: PasswordReset): Promise<void>
  findById(passwordResetId: string): Promise<PasswordReset | null>
}
