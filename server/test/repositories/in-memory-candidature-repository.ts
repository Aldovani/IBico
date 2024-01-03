import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  FindByUserIdAndOpportunityIdProps,
  FindManyByUserIdProps,
  ICandidaturesRepository,
} from '@/domain/portal/application/repositories/candidatures-repository'
import { Candidate } from '@/domain/portal/enterprise/entities/candidate'
import { Candidature } from '@/domain/portal/enterprise/entities/candidature'

export class InMemoryCandidatureRepository implements ICandidaturesRepository {
  public candidatures: Candidature[] = []

  async create(candidature: Candidature): Promise<void> {
    this.candidatures.push(candidature)
  }

  async save(candidature: Candidature): Promise<void> {
    const candidatureIndex = this.candidatures.findIndex(
      (item) => item.id === candidature.id,
    )

    this.candidatures[candidatureIndex] = candidature
  }

  async delete(candidate: Candidature): Promise<void> {
    const candidatures = this.candidatures.filter(
      (item) => item.id.toString() !== candidate.id.toString(),
    )
    this.candidatures = candidatures
  }

  async findById(candidatureId: string): Promise<Candidature | null> {
    const candidature = this.candidatures.find(
      (item) => item.id.toString() === candidatureId,
    )

    if (!candidature) {
      return null
    }

    return candidature
  }

  async findManyByUserId(
    { status, userId }: FindManyByUserIdProps,
    { page, perPage }: PaginationParams,
  ): Promise<{ candidatures: Candidature[]; total: number }> {
    const candidatures = this.candidatures
      .filter(
        (item) =>
          item.userId.toString() === userId &&
          item.opportunity?.status === status,
      )
      .splice((page - 1) * perPage, page * perPage)

    const total = this.candidatures.filter(
      (item) =>
        item.userId.toString() === userId &&
        item.opportunity?.status === status,
    ).length

    return {
      candidatures,
      total,
    }
  }

  async findManyByOpportunityId(
    opportunityId: string,
    { page, perPage }: PaginationParams,
  ): Promise<{ candidates: Candidate[]; total: number }> {
    const candidates = this.candidatures
      .filter((item) => item.opportunityId.toString() === opportunityId)
      .splice((page - 1) * perPage, page * perPage)

    const total = this.candidatures.filter(
      (item) => item.opportunityId.toString() === opportunityId,
    ).length

    const candidateToDomain = candidates.map(() =>
      Candidate.create({
        avatar: '',
        name: '',
        rating: 0,
        username: '',
      }),
    )

    return {
      candidates: candidateToDomain,
      total,
    }
  }

  async findByUserIdAndOpportunityId({
    opportunityId,
    userId,
  }: FindByUserIdAndOpportunityIdProps): Promise<Candidature | null> {
    const candidature = this.candidatures.find(
      (item) =>
        item.opportunityId.toString() === opportunityId &&
        item.userId.toString() === userId,
    )

    if (!candidature) {
      return null
    }

    return candidature
  }
}
