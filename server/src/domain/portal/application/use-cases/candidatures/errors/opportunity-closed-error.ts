import { UseCaseError } from '@/core/errors/use-case-error'

export class OpportunityClosedError extends Error implements UseCaseError {
  constructor(opportunityId: string) {
    super(`opportunity ${opportunityId} has been closed`)
  }
}
