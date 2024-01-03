import { FastifyInstance } from 'fastify'
import { CreateReviewController } from '../controllers/reviews/create-review-controller'
import { ensuredAuth } from '../middlewares/ensuredAuth'
import { FetchReviewController } from '../controllers/reviews/fetch-reviews-controller'
import { FetchMyReviewsController } from '../controllers/reviews/fetch-my-reviews-controller'

const createReviewController = new CreateReviewController()
const fetchReviewController = new FetchReviewController()
const fetchMyReviewsController = new FetchMyReviewsController()

export async function reviewsRoutes(app: FastifyInstance) {
  app.post(
    '/reviews',
    {
      onRequest: [ensuredAuth],
    },
    createReviewController.handle,
  )
  app.get(
    '/reviews',
    {
      onRequest: [ensuredAuth],
    },
    fetchMyReviewsController.handle,
  )
  app.get(
    '/reviews/:username',
    {
      onRequest: [ensuredAuth],
    },
    fetchReviewController.handle,
  )
}
