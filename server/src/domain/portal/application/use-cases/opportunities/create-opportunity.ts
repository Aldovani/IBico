import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Opportunity } from '@/domain/portal/enterprise/entities/opportunity'
import { IOpportunitiesRepository } from '@/domain/portal/application/repositories/opportunities-repository'
import { Either, right } from '@/core/types/either'
import { OpportunitySkillList } from '@/domain/portal/enterprise/entities/opportunity-skill-list'
import { ISkillsRepository } from '../../repositories/skills-repository'
import { Skill } from '@/domain/portal/enterprise/entities/skill'
import { OpportunitySkill } from '@/domain/portal/enterprise/entities/opportunity-skill'
import { inject, injectable } from 'tsyringe'

type CreateOpportunity = {
  title: string
  local: string
  description: string
  amount: number
  startDateTime: Date
  endDateTime: Date
  timeLoad: string
  skills: string[]
}

type CreateOpportunityRequest = {
  opportunity: CreateOpportunity
  userId: string
}

type CreateOpportunityResponse = Either<
  null,
  {
    opportunity: Opportunity
  }
>

@injectable()
export class CreateOpportunityUseCase {
  constructor(
    @inject('OpportunityRepository')
    private opportunityRepository: IOpportunitiesRepository,
    @inject('SkillRepository')
    private skillRepository: ISkillsRepository,
  ) {}

  async execute({
    opportunity: opportunityPayload,
    userId,
  }: CreateOpportunityRequest): Promise<CreateOpportunityResponse> {
    const opportunity = Opportunity.create({
      ...opportunityPayload,
      authorId: new UniqueEntityId(userId),
      skills: new OpportunitySkillList(),
    })

    const opportunitySkills = await Promise.all(
      opportunityPayload.skills.map(async (skill) => {
        let skillExists = await this.skillRepository.findByName(skill)

        if (!skillExists) {
          skillExists = Skill.create({
            name: skill,
          })

          await this.skillRepository.create(skillExists)
        }

        const opportunitySkill = OpportunitySkill.create({
          skillId: skillExists.id,
          opportunityId: opportunity.id,
        })

        return opportunitySkill
      }),
    )
    const opportunitySkillsList = new OpportunitySkillList(opportunitySkills)

    opportunity.skills = opportunitySkillsList

    await this.opportunityRepository.create(opportunity)

    return right({
      opportunity,
    })
  }
}
