import { describe, it, expect, beforeEach } from 'vitest'
import { CreateOpportunityUseCase } from '@/domain/portal/application/use-cases/opportunities/create-opportunity'
import { InMemoryOpportunityRepository } from 'test/repositories/in-memory-opportunity-repository'
import { faker } from '@faker-js/faker'
import { InMemorySkillRepository } from 'test/repositories/in-memory-skill-repository'

let inMemoryOpportunityRepository: InMemoryOpportunityRepository
let inMemorySkillRepository: InMemorySkillRepository
let sut: CreateOpportunityUseCase

describe('Create opportunity', () => {
  beforeEach(() => {
    inMemoryOpportunityRepository = new InMemoryOpportunityRepository()
    inMemorySkillRepository = new InMemorySkillRepository()
    sut = new CreateOpportunityUseCase(
      inMemoryOpportunityRepository,
      inMemorySkillRepository,
    )
  })
  it(' should be able create a new opportunity', async () => {
    const response = await sut.execute({
      opportunity: {
        amount: faker.number.int(),
        description: faker.lorem.sentence(2),
        local: faker.location.city(),
        title: faker.lorem.text(),
        endDateTime: new Date(),
        startDateTime: new Date(),
        timeLoad: faker.lorem.text(),
        skills: ['teste'],
      },
      userId: '1',
    })
    expect(inMemoryOpportunityRepository.opportunities).toHaveLength(1)
    expect(response.value?.opportunity.status).toBe('CREATED')
  })
})
