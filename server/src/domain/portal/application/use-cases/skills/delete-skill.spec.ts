import { InMemorySkillRepository } from 'test/repositories/in-memory-skill-repository'
import { makeSkill } from 'test/factories/make-skill'
import { DeleteSkillUseCase } from './delete-skill'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'

let inMemorySkillRepository: InMemorySkillRepository
let sut: DeleteSkillUseCase

describe('Delete skill', () => {
  beforeEach(() => {
    inMemorySkillRepository = new InMemorySkillRepository()
    sut = new DeleteSkillUseCase(inMemorySkillRepository)
  })

  it('should be able delete a skills', async () => {
    await inMemorySkillRepository.create(makeSkill({}, new UniqueEntityId('1')))

    const response = await sut.execute({ skillId: '1' })

    expect(response.isRight()).toBe(true)
  })

  it('should not be able delete a skills with non-exists', async () => {
    const response = await sut.execute({ skillId: '1' })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
