import { constants } from '@/core/constants'
import { Review } from '@/domain/portal/enterprise/entities/review'

export class ReviewsPresenter {
  private static avatarBaseUrl = `${constants.BASE_URL}/public`

  static toManyHTTP(reviews: Review[]) {
    return reviews.map((review) => {
      return {
        id: review.id.toString(),
        describe: review.description,
        rating: review.rating,
        createdAt: review.createdAt,
        opportunity: {
          title: review.opportunity?.title,
          description: review.opportunity?.description,
          author: {
            name: review.opportunity?.Author?.name,
            username: review.opportunity?.Author?.username,
            avatar: review.opportunity?.Author?.avatar
              ? `${this.avatarBaseUrl}/${review.opportunity?.Author?.avatar}`
              : `${this.avatarBaseUrl}/default.jpg`,
          },
        },
      }
    })
  }
}
