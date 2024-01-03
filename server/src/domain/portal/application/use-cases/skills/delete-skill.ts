import { Either, left, right } from '@/core/types/either'
import { ISkillsRepository } from '../../repositories/skills-repository'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'

type DeleteSkillRequest = {
  skillId: string
}

type DeleteSkillResponse = Either<ResourceNotFoundError, unknown>
export class DeleteSkillUseCase {
  constructor(private skillRepository: ISkillsRepository) {}

  async execute({ skillId }: DeleteSkillRequest): Promise<DeleteSkillResponse> {
    const skill = await this.skillRepository.findById(skillId)

    if (!skill) {
      return left(new ResourceNotFoundError())
    }

    await this.skillRepository.delete(skill)

    return right({})
  }
}
