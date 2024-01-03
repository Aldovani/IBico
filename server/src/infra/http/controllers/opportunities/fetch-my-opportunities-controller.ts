import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { OpportunityPresenter } from '../../presenters/opportunity-presenter'
import { FetchMyOpportunityUseCase } from '@/domain/portal/application/use-cases/opportunities/fetch-my-opportunities'

const fetchMyOpportunitiesQuerySchema = z.object({
  perPage: z.coerce.number().min(1).default(8),
  page: z.coerce.number().min(1).default(1),
  status: z
    .enum(['CREATED', 'PENDING', 'CLOSED', 'DISABLED'])
    .default('CREATED'),
})

type FetchMyOpportunitiesQuerySchema = z.infer<
  typeof fetchMyOpportunitiesQuerySchema
>

export class FetchMyOpportunitiesController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { page, perPage, status } =
      ZodValidationPipe.transform<FetchMyOpportunitiesQuerySchema>(
        fetchMyOpportunitiesQuerySchema,
        req.query,
      )
    const fetchMyOpportunityUseCase = container.resolve(
      FetchMyOpportunityUseCase,
    )

    const response = await fetchMyOpportunityUseCase.execute({
      page,
      perPage,
      userId: req.user.id,
      status,
    })

    if (response.isRight()) {
      const opportunities = OpportunityPresenter.toManyHTTP(
        response.value.opportunities,
      )
      return res.status(200).send({
        status: 200,
        message: 'fetch my opportunities',
        data: opportunities,
        totalElements: response.value.totalElements,
        totalPages: response.value.totalPages,
        isLast: response.value.isLast,
      })
    }
  }
}
