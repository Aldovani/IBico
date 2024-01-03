import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  Opportunity,
  OpportunityStatus,
} from '@/domain/portal/enterprise/entities/opportunity'

export type OpportunityQuery = {
  title?: string
  local?: string
  amount?: number
  status?: OpportunityStatus
}

export type FindManyByUserIdProps = {
  userId: string
  status: OpportunityStatus
}

export interface IOpportunitiesRepository {
  create(opportunity: Opportunity): Promise<void>
  save(opportunity: Opportunity): Promise<void>
  delete(opportunity: Opportunity): Promise<void>
  findById(opportunityId: string): Promise<Opportunity | null>
  findMany(
    query: OpportunityQuery,
    paginationParams: PaginationParams,
  ): Promise<{ opportunities: Opportunity[]; total: number }>
  findManyByUserId(
    { status, userId }: FindManyByUserIdProps,
    paginationParams: PaginationParams,
  ): Promise<{ opportunities: Opportunity[]; total: number }>
}
