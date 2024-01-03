import { Skill } from '../../enterprise/entities/skill'

export interface ISkillsRepository {
  create(skill: Skill): Promise<void>
  save(skill: Skill): Promise<void>
  delete(skill: Skill): Promise<void>
  findById(skillId: string): Promise<Skill | null>
  findByName(name: string): Promise<Skill | null>
}
