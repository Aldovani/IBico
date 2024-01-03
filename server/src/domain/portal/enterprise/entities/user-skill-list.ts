import { WatchedList } from '@/core/entities/watched-list'
import { UserSkill } from './user-skill'

export class UserSkillList extends WatchedList<UserSkill> {
  compareItems(a: UserSkill, b: UserSkill): boolean {
    return a.skillId.toString() === b.skillId.toString()
  }
}
