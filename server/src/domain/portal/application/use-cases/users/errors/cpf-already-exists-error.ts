import { UseCaseError } from '@/core/errors/use-case-error'

export class CPFAlreadyExistsError extends Error implements UseCaseError {
  constructor(username: string) {
    super(`CPF ${username} already exists`)
  }
}
