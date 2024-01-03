import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  FindManyByUserIdProps,
  IOpportunitiesRepository,
  OpportunityQuery,
} from '@/domain/portal/application/repositories/opportunities-repository'
import { Opportunity } from '@/domain/portal/enterprise/entities/opportunity'

export class InMemoryOpportunityRepository implements IOpportunitiesRepository {
  public opportunities: Opportunity[] = []

  async create(opportunity: Opportunity): Promise<void> {
    this.opportunities.push(opportunity)
  }

  async delete(opportunity: Opportunity): Promise<void> {
    const opportunities = this.opportunities.filter(
      (item) => item.id.toString() !== opportunity.id.toString(),
    )

    this.opportunities = opportunities
  }

  async save(opportunity: Opportunity): Promise<void> {
    const opportunityIndex = this.opportunities.findIndex(
      (item) => item.id === opportunity.id,
    )

    this.opportunities[opportunityIndex] = opportunity
  }

  async findById(opportunityId: string): Promise<Opportunity | null> {
    const opportunity = this.opportunities.find(
      (item) => item.id.toString() === opportunityId,
    )
    if (!opportunity) {
      return null
    }

    return opportunity
  }

  async findManyByUserId(
    { status, userId }: FindManyByUserIdProps,
    { page, perPage }: PaginationParams,
  ): Promise<{ opportunities: Opportunity[]; total: number }> {
    const opportunity = this.opportunities
      .filter(
        (item) => item.authorId.toString() === userId && item.status === status,
      )
      .slice((page - 1) * perPage, page * perPage)

    const total = this.opportunities.filter(
      (item) => item.authorId.toString() === userId,
    ).length

    return { opportunities: opportunity, total }
  }

  async findMany(
    query: OpportunityQuery,
    { page, perPage }: PaginationParams,
  ): Promise<{ opportunities: Opportunity[]; total: number }> {
    const opportunity = this.opportunities
      .filter((item) =>
        query.title ? query.title.includes(item.title) && item : item,
      )
      .filter((item) =>
        query.local ? query.local.includes(item.local) && item : item,
      )
      .filter((item) =>
        query.amount ? query.amount >= item.amount && item : item,
      )
      .slice((page - 1) * perPage, page * perPage)

    const total = this.opportunities
      .filter((item) =>
        query.title ? query.title.includes(item.title) && item : item,
      )
      .filter((item) =>
        query.local ? query.local.includes(item.local) && item : item,
      )
      .filter((item) =>
        query.amount ? query.amount >= item.amount && item : item,
      ).length

    return { opportunities: opportunity, total }
  }
}
