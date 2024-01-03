import { constants } from '@/core/constants'
import { Candidate } from '@/domain/portal/enterprise/entities/candidate'
import { Candidature } from '@/domain/portal/enterprise/entities/candidature'

export class CandidaturePresenter {
  private static avatarBaseUrl = `${constants.BASE_URL}/public`

  static toManyHTTP(candidatures: Candidature[]) {
    return candidatures.map((candidature) => {
      return {
        id: candidature.id.toString(),
        opportunityId: candidature.opportunityId.toString(),
        opportunity: {
          title: candidature.opportunity?.title,
          amount: candidature.opportunity?.amount,
          description: candidature.opportunity?.description,
          author: {
            name: candidature.opportunity?.Author?.name,
            username: candidature.opportunity?.Author?.username,
            avatar: candidature.opportunity?.Author?.avatar
              ? `${this.avatarBaseUrl}/${candidature.opportunity?.Author?.avatar}`
              : `${this.avatarBaseUrl}/default.jpg`,
          },
        },
      }
    })
  }

  static toManyCandidatesHTTP(candidates: Candidate[]) {
    return candidates.map((item) => {
      return {
        id: item.id.toString(),
        avatar: item.avatar
          ? `${this.avatarBaseUrl}/${item.avatar}`
          : `${this.avatarBaseUrl}/default.jpg`,
        username: item.username,
        name: item.name,
        rating: item.rating,
      }
    })
  }
}
