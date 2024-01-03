import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { DeleteOpportunityUseCase } from '@/domain/portal/application/use-cases/opportunities/delete-opportunity'
import { NotAllowedError } from '@/core/errors/erros/not-allowed-error'

const deleteOpportunityParamsSchema = z.object({
  id: z.string().uuid(),
})

type DeleteOpportunityParamsSchema = z.infer<
  typeof deleteOpportunityParamsSchema
>

export class DeleteOpportunityController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const deleteOpportunityUseCase = container.resolve(DeleteOpportunityUseCase)
    const { id } = ZodValidationPipe.transform<DeleteOpportunityParamsSchema>(
      deleteOpportunityParamsSchema,
      req.params,
    )
    const response = await deleteOpportunityUseCase.execute({
      opportunityId: id,
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
        message: 'opportunity deleted',
      })
    }
  }
}
