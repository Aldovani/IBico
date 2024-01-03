import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { OpportunityPresenter } from '../../presenters/opportunity-presenter'
import { EditStatusOpportunityUseCase } from '@/domain/portal/application/use-cases/opportunities/edit-status-opportunity'

const editStatusOpportunityParamsSchema = z.object({
  opportunityId: z.string().uuid(),
  status: z
    .enum(['CREATED', 'DISABLED', 'CLOSED', 'DISABLED'])
    .default('CREATED'),
})

type EditStatusOpportunityParamsSchema = z.infer<
  typeof editStatusOpportunityParamsSchema
>

export class EditStatusOpportunityController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { opportunityId, status } =
      ZodValidationPipe.transform<EditStatusOpportunityParamsSchema>(
        editStatusOpportunityParamsSchema,
        req.params,
      )
    const editOpportunityUseCase = container.resolve(
      EditStatusOpportunityUseCase,
    )

    const response = await editOpportunityUseCase.execute({
      userId: req.user.id,
      status,
      opportunityId,
    })

    if (response.isLeft()) {
      const value = response.value

      switch (value.constructor) {
        case ResourceNotFoundError:
          return res.status(404).send({
            message: value.message,
            status: 404,
          })
      }
    }

    if (response.isRight()) {
      const opportunity = OpportunityPresenter.toHTTP(
        response.value.opportunity,
      )
      return res.status(200).send({
        status: 200,
        message: 'Opportunity edited',
        data: opportunity,
      })
    }
  }
}
