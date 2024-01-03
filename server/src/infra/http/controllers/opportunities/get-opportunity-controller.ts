import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { OpportunityPresenter } from '../../presenters/opportunity-presenter'
import { GetOpportunityUseCase } from '@/domain/portal/application/use-cases/opportunities/get-opportunity'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'

const getOpportunityParamsSchema = z.object({
  id: z.string().uuid(),
})

type GetOpportunityParamsSchema = z.infer<typeof getOpportunityParamsSchema>

export class GetOpportunityController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const fetchOpportunityUseCase = container.resolve(GetOpportunityUseCase)
    const { id } = ZodValidationPipe.transform<GetOpportunityParamsSchema>(
      getOpportunityParamsSchema,
      req.params,
    )

    const response = await fetchOpportunityUseCase.execute({
      opportunityId: id,
    })

    if (response.isLeft()) {
      const value = response.value

      switch (value.constructor) {
        case ResourceNotFoundError:
          return res.status(404).send({
            status: 404,
            message: value.message,
          })
      }
    }

    if (response.isRight()) {
      const opportunity = OpportunityPresenter.toHTTP(
        response.value.opportunity,
      )

      return res.status(200).send({
        status: 200,
        message: 'get opportunity',
        data: opportunity,
      })
    }
  }
}
