import { PasswordCode } from '../../enterprise/entities/password-code'

export interface IPasswordCodeRepository {
  create(passwordCode: PasswordCode): Promise<void>
  save(data: PasswordCode): Promise<void>
  findById(passwordCodeId: string): Promise<PasswordCode | null>
}
