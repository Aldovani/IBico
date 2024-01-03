import { UseCaseError } from '@/core/errors/use-case-error'

export class CandidateAlreadySelectedError
  extends Error
  implements UseCaseError
{
  constructor(opportunityId: string) {
    super(`opportunity ${opportunityId} has a candidate`)
  }
}
