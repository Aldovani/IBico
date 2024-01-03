import { CreateSkillUseCase } from './create-skill'
import { InMemorySkillRepository } from 'test/repositories/in-memory-skill-repository'
import { ResourceAlreadyExists } from '@/core/errors/erros/resource-already-exists'

let inMemorySkillRepository: InMemorySkillRepository
let sut: CreateSkillUseCase

describe('Create skill', () => {
  beforeEach(() => {
    inMemorySkillRepository = new InMemorySkillRepository()
    sut = new CreateSkillUseCase(inMemorySkillRepository)
  })

  it('should be able create a skills', async () => {
    const response = await sut.execute({ name: 'Agilidade' })
    expect(1 + 1).toBe(2)

    expect(response.isRight()).toBe(true)
  })

  it('should not be able create a skills with the same name', async () => {
    await sut.execute({ name: 'Agilidade' })
    const response = await sut.execute({ name: 'Agilidade' })
    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(ResourceAlreadyExists)
  })
})
