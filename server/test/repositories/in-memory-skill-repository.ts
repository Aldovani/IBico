import { ISkillsRepository } from '@/domain/portal/application/repositories/skills-repository'
import { Skill } from '@/domain/portal/enterprise/entities/skill'

export class InMemorySkillRepository implements ISkillsRepository {
  public skills: Skill[] = []

  async create(skill: Skill): Promise<void> {
    this.skills.push(skill)
  }

  async save(skill: Skill): Promise<void> {
    const skillIndex = this.skills.findIndex(
      (item) => item.id.toString() === skill.id.toString(),
    )
    this.skills[skillIndex] = skill
  }

  async findById(skillId: string): Promise<Skill | null> {
    const skill = this.skills.find((item) => item.id.toString() === skillId)
    if (!skill) {
      return null
    }

    return skill
  }

  async findByName(name: string): Promise<Skill | null> {
    const skill = this.skills.find((item) => item.name === name)

    if (!skill) {
      return null
    }

    return skill
  }

  async delete(skill: Skill): Promise<void> {
    const skills = this.skills.filter(
      (item) => item.id.toString() !== skill.id.toString(),
    )

    this.skills = skills
  }
}
