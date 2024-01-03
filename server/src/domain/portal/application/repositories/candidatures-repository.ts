import { PaginationParams } from '@/core/repositories/pagination-params'
import { Candidature } from '@/domain/portal/enterprise/entities/candidature'
import { Candidate } from '../../enterprise/entities/candidate'
import { OpportunityStatus } from '../../enterprise/entities/opportunity'

export type FindByUserIdAndOpportunityIdProps = {
  userId: string
  opportunityId: string
}
export type FindManyByUserIdProps = {
  userId: string
  status: OpportunityStatus
}

export interface ICandidaturesRepository {
  create(candidature: Candidature): Promise<void>
  save(candidature: Candidature): Promise<void>
  delete(candidature: Candidature): Promise<void>
  findById(candidatureId: string): Promise<Candidature | null>
  findManyByUserId(
    { status, userId }: FindManyByUserIdProps,
    paginationParams: PaginationParams,
  ): Promise<{ candidatures: Candidature[]; total: number }>
  findManyByOpportunityId(
    opportunityId: string,
    paginationParams: PaginationParams,
  ): Promise<{ candidates: Candidate[]; total: number }>
  findByUserIdAndOpportunityId(
    props: FindByUserIdAndOpportunityIdProps,
  ): Promise<Candidature | null>
}
