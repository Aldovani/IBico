import { NotAllowedError } from '@/core/errors/erros/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { Either, left, right } from '@/core/types/either'
import { IOpportunitiesRepository } from '@/domain/portal/application/repositories/opportunities-repository'
import { Opportunity } from '@/domain/portal/enterprise/entities/opportunity'
import { OpportunitySkillList } from '@/domain/portal/enterprise/entities/opportunity-skill-list'
import { ISkillsRepository } from '../../repositories/skills-repository'
import { Skill } from '@/domain/portal/enterprise/entities/skill'
import { OpportunitySkill } from '@/domain/portal/enterprise/entities/opportunity-skill'
import { inject, injectable } from 'tsyringe'

type EditOpportunityPayload = {
  title: string
  amount: number
  local: string
  startDateTime: Date
  endDateTime: Date
  description: string
  skills: string[]
  timeLoad: string
  status: 'CREATED' | 'DISABLED'
}

type EditOpportunityRequest = {
  opportunity: EditOpportunityPayload
  opportunityId: string
  userId: string
}

type EditOpportunityResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { opportunity: Opportunity }
>

@injectable()
export class EditOpportunityUseCase {
  constructor(
    @inject('OpportunityRepository')
    private opportunityRepository: IOpportunitiesRepository,
    @inject('SkillRepository')
    private skillRepository: ISkillsRepository,
  ) {}

  async execute({
    opportunity: payload,
    userId,
    opportunityId,
  }: EditOpportunityRequest): Promise<EditOpportunityResponse> {
    const opportunity = await this.opportunityRepository.findById(opportunityId)

    if (!opportunity) {
      return left(new ResourceNotFoundError())
    }

    const isOwner = opportunity.authorId.toValue() === userId

    if (!isOwner) {
      return left(new NotAllowedError())
    }

    const currentOpportunitySkills = opportunity.skills.currentItems?.map(
      (item) => {
        return OpportunitySkill.create({
          opportunityId: item.opportunityId,
          skillId: item.skillId,
          name: item.name,
        })
      },
    )
    const opportunitySkillsList = new OpportunitySkillList(
      currentOpportunitySkills,
    )

    const opportunitySkills = await Promise.all(
      payload.skills.map(async (skill) => {
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
          name: skill,
        })

        return opportunitySkill
      }),
    )

    opportunitySkillsList.update(opportunitySkills)

    opportunity.amount = payload.amount
    opportunity.description = payload.description
    opportunity.title = payload.title
    opportunity.startDateTime = payload.startDateTime
    opportunity.endDateTime = payload.endDateTime
    opportunity.skills = opportunitySkillsList
    opportunity.local = payload.local
    opportunity.timeLoad = payload.timeLoad
    opportunity.status = payload.status

    await this.opportunityRepository.save(opportunity)

    return right({
      opportunity,
    })
  }
}
