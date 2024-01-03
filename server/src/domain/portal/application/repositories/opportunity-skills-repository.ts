import { OpportunitySkill } from '../../enterprise/entities/opportunity-skill'

export interface IOpportunitySkillsRepository {
  findManyByOpportunityId(opportunityId: string): Promise<OpportunitySkill[]>
  createMany(opportunitySkill: OpportunitySkill[]): Promise<void>
  deleteMany(opportunitySkill: OpportunitySkill[]): Promise<void>
}
