import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/erros/not-allowed-error'
import { DeleteCandidatureUseCase } from '@/domain/portal/application/use-cases/candidatures/delete-candidature'

const createCandidateParamsSchema = z.object({
  candidatureId: z.string().uuid(),
})

type DeleteCandidateParamsSchema = z.infer<typeof createCandidateParamsSchema>

export class DeleteCandidateOpportunityController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const createCandidatureUseCase = container.resolve(DeleteCandidatureUseCase)
    const { candidatureId } =
      ZodValidationPipe.transform<DeleteCandidateParamsSchema>(
        createCandidateParamsSchema,
        req.params,
      )

    const response = await createCandidatureUseCase.execute({
      candidatureId,
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
        message: 'Candidature deleted',
      })
    }
  }
}
