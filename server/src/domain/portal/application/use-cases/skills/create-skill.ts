import { Either, left, right } from '@/core/types/either'
import { ResourceAlreadyExists } from '@/core/errors/erros/resource-already-exists'
import { Skill } from '@/domain/portal/enterprise/entities/skill'
import { ISkillsRepository } from '../../repositories/skills-repository'

type CreateSkillRequest = {
  name: string
}

type CreateSkillResponse = Either<ResourceAlreadyExists, { skill: Skill }>
export class CreateSkillUseCase {
  constructor(private skillRepository: ISkillsRepository) {}

  async execute({ name }: CreateSkillRequest): Promise<CreateSkillResponse> {
    const skillAlreadyExists = await this.skillRepository.findByName(name)

    if (skillAlreadyExists) {
      return left(new ResourceAlreadyExists())
    }

    const skill = Skill.create({ name })

    await this.skillRepository.create(skill)

    return right({
      skill,
    })
  }
}
