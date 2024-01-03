import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { FetchReviewsUseCase } from '@/domain/portal/application/use-cases/reviews/fetch-reviews'
import { ReviewsPresenter } from '../../presenters/reviews-presenter'

const fetchReviewsQuerySchema = z.object({
  page: z.coerce.number().default(1),
  perPage: z.coerce.number().default(10),
})

const fetchReviewsParamsSchema = z.object({
  username: z.string(),
})

type FetchReviewsQuerySchema = z.infer<typeof fetchReviewsQuerySchema>
type FetchReviewsParamsSchema = z.infer<typeof fetchReviewsParamsSchema>

export class FetchReviewController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const fetchReviewsUseCase = container.resolve(FetchReviewsUseCase)
    const { page, perPage } =
      ZodValidationPipe.transform<FetchReviewsQuerySchema>(
        fetchReviewsQuerySchema,
        req.query,
      )
    const { username } = ZodValidationPipe.transform<FetchReviewsParamsSchema>(
      fetchReviewsParamsSchema,
      req.params,
    )

    const response = await fetchReviewsUseCase.execute({
      page,
      perPage,
      username,
    })

    if (response.isRight()) {
      const reviews = ReviewsPresenter.toManyHTTP(response.value.reviews)

      return res.status(200).send({
        status: 200,
        message: 'Fetch Reviews',
        data: reviews,
      })
    }
  }
}
