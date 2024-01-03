import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOpportunityRepository } from 'test/repositories/in-memory-opportunity-repository'
import { EditOpportunityUseCase } from './edit-opportunity'
import { makeOpportunity } from 'test/factories/make-opportunity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/erros/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { InMemorySkillRepository } from 'test/repositories/in-memory-skill-repository'
import { OpportunitySkillList } from '@/domain/portal/enterprise/entities/opportunity-skill-list'
import { OpportunitySkill } from '@/domain/portal/enterprise/entities/opportunity-skill'

let inMemoryOpportunityRepository: InMemoryOpportunityRepository
let inMemorySkillRepository: InMemorySkillRepository
let sut: EditOpportunityUseCase

describe('Edit opportunity', () => {
  beforeEach(() => {
    inMemoryOpportunityRepository = new InMemoryOpportunityRepository()
    inMemorySkillRepository = new InMemorySkillRepository()
    sut = new EditOpportunityUseCase(
      inMemoryOpportunityRepository,
      inMemorySkillRepository,
    )
  })
  it('should be edit an opportunity', async () => {
    const opportunitySkillsList = new OpportunitySkillList()
    opportunitySkillsList.update([
      OpportunitySkill.create({
        opportunityId: new UniqueEntityId(),
        skillId: new UniqueEntityId(),
      }),
    ])

    const opportunity = makeOpportunity({
      authorId: new UniqueEntityId('1'),
      skills: opportunitySkillsList,
    })
    await inMemoryOpportunityRepository.create(opportunity)

    const response = await sut.execute({
      opportunityId: opportunity.id.toString(),
      userId: '1',
      opportunity: {
        amount: 100,
        timeLoad: '2 dias',
        description: '',
        endDateTime: new Date(),
        startDateTime: new Date(),
        local: '',
        skills: ['a', 'b'],
        title: 'Novo titulo',
      },
    })

    expect(response.isRight()).toBe(true)
    expect(inMemoryOpportunityRepository.opportunities[0]).toEqual(
      expect.objectContaining({
        title: 'Novo titulo',
      }),
    )
    expect(inMemoryOpportunityRepository.opportunities).toHaveLength(1)
  })
  it('should not be able to edit a opportunity the other author', async () => {
    const opportunity = makeOpportunity()
    await inMemoryOpportunityRepository.create(opportunity)

    const response = await sut.execute({
      opportunityId: opportunity.id.toString(),
      userId: '1',
      opportunity: {
        amount: 100,
        description: '',
        endDateTime: new Date(),
        startDateTime: new Date(),
        local: '',
        timeLoad: '2 dias',

        skills: [''],
        title: 'Novo titulo',
      },
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotAllowedError)
  })

  it('it should not be possible to edit a non-existent opportunity', async () => {
    const response = await sut.execute({
      opportunityId: '1',
      userId: '1',
      opportunity: {
        amount: 100,
        description: '',
        endDateTime: new Date(),
        startDateTime: new Date(),
        local: '',
        skills: [''],
        timeLoad: '2 dias',
        title: 'Novo titulo',
      },
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
