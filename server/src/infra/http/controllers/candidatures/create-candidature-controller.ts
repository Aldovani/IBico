import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/erros/not-allowed-error'
import { CreateCandidatureUseCase } from '@/domain/portal/application/use-cases/candidatures/create-candidature'

const createCandidatureParamsSchema = z.object({
  opportunityId: z.string().uuid(),
})

type CreateCandidatureParamsSchema = z.infer<
  typeof createCandidatureParamsSchema
>

export class CreateCandidatureOpportunityController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const createCandidatureUseCase = container.resolve(CreateCandidatureUseCase)
    const { opportunityId } =
      ZodValidationPipe.transform<CreateCandidatureParamsSchema>(
        createCandidatureParamsSchema,
        req.params,
      )

    const response = await createCandidatureUseCase.execute({
      opportunityId,
      userId: req.user.id,
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
      }
    }

    if (response.isRight()) {
      return res.status(200).send({
        status: 200,
        message: 'Candidature created',
      })
    }
  }
}
