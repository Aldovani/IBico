import { WatchedList } from '@/core/entities/watched-list'
import { OpportunitySkill } from './opportunity-skill'

export class OpportunitySkillList extends WatchedList<OpportunitySkill> {
  compareItems(a: OpportunitySkill, b: OpportunitySkill): boolean {
    return a.skillId.toString() === b.skillId.toString()
  }
}
