import { UseCaseError } from '@/core/errors/use-case-error'

export class ResourceExpiredError extends Error implements UseCaseError {
  constructor() {
    super('Resource expired')
  }
}
