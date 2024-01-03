import { UseCaseError } from '@/core/errors/use-case-error'

export class InvalidCredencialError extends Error implements UseCaseError {
  constructor() {
    super('invalid credential')
  }
}
