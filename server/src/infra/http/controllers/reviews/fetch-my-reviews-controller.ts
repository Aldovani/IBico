import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { FetchMyReviewsUseCase } from '@/domain/portal/application/use-cases/reviews/fetch-my-reviews'
import { ReviewsPresenter } from '../../presenters/reviews-presenter'

const fetchReviewsQuerySchema = z.object({
  page: z.coerce.number().default(1),
  perPage: z.coerce.number().default(10),
})

type FetchReviewsQuerySchema = z.infer<typeof fetchReviewsQuerySchema>

export class FetchMyReviewsController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const fetchMyReviewsUseCase = container.resolve(FetchMyReviewsUseCase)
    const { page, perPage } =
      ZodValidationPipe.transform<FetchReviewsQuerySchema>(
        fetchReviewsQuerySchema,
        req.query,
      )

    const response = await fetchMyReviewsUseCase.execute({
      page,
      perPage,
      userId: req.user.id,
    })

    if (response.isRight()) {
      const reviews = ReviewsPresenter.toManyHTTP(response.value.reviews)

      return res.status(201).send({
        status: 201,
        message: 'Review created',
        data: reviews,
      })
    }
  }
}
