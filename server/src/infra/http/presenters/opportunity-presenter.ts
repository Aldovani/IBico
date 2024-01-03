import { constants } from '@/core/constants'
import { Opportunity } from '@/domain/portal/enterprise/entities/opportunity'

export class OpportunityPresenter {
  private static avatarBaseUrl = `${constants.BASE_URL}/public`
  static toHTTP(opportunity: Opportunity) {
    return {
      id: opportunity.id.toString(),
      title: opportunity.title,
      amount: opportunity.amount,
      description: opportunity.description,
      local: opportunity.local,
      skills: opportunity.skills.getItems().map((item) => item.name),
      timeLoad: opportunity.timeLoad,
      startDateTime: opportunity.startDateTime,
      createdAt: opportunity.createdAt,
      endDateTime: opportunity.endDateTime,
      postBy: {
        name: opportunity.Author?.name,
        username: opportunity.Author?.username,
        avatar: opportunity.Author?.avatar
          ? `${this.avatarBaseUrl}/${opportunity.Author?.avatar}`
          : `${this.avatarBaseUrl}/default.jpg`,
      },
    }
  }

  static toManyHTTP(opportunities: Opportunity[]) {
    return opportunities.map((item) => ({
      id: item.id.toString(),
      title: item.title,
      amount: item.amount,
      description: item.description,
      local: item.local,
      timeLoad: item.timeLoad,
      postBy: {
        name: item.Author?.name,
        username: item.Author?.username,
        avatar: item.Author?.avatar
          ? `${this.avatarBaseUrl}/${item.Author?.avatar}`
          : `${this.avatarBaseUrl}/default.jpg`,
      },
    }))
  }
}
