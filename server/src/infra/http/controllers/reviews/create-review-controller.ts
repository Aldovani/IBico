import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { CreateReviewUseCase } from '@/domain/portal/application/use-cases/reviews/create-reviews'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/erros/not-allowed-error'
import { ResourceAlreadyExists } from '@/core/errors/erros/resource-already-exists'

const createReviewBodySchema = z.object({
  opportunityId: z.string().uuid(),
  description: z.string(),
  rating: z.number().min(1).max(10),
})

type CreateReviewBodySchema = z.infer<typeof createReviewBodySchema>

export class CreateReviewController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const createReviewUseCase = container.resolve(CreateReviewUseCase)
    const { description, opportunityId, rating } =
      ZodValidationPipe.transform<CreateReviewBodySchema>(
        createReviewBodySchema,
        req.body,
      )

    const response = await createReviewUseCase.execute({
      opportunityId,
      userId: req.user.id,
      description,
      rating,
    })

    if (response.isLeft()) {
      const value = response.value

      switch (value.constructor) {
        case ResourceNotFoundError:
          return res.status(404).send({
            status: 404,
            message: value.message,
          })
        case NotAllowedError:
          return res.status(401).send({
            status: 401,
            message: value.message,
          })
        case ResourceAlreadyExists:
          return res.status(401).send({
            status: 401,
            message: value.message,
          })
      }
    }

    if (response.isRight()) {
      return res.status(201).send({
        status: 201,
        message: 'Review created',
      })
    }
  }
}
