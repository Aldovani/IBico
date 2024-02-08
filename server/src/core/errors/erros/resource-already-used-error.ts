import { UseCaseError } from '@/core/errors/use-case-error'

export class ResourceAlreadyUsedError extends Error implements UseCaseError {
  constructor() {
    super('Resource Already Used')
  }
}
