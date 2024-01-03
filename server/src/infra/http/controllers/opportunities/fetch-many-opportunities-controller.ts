import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { OpportunityPresenter } from '../../presenters/opportunity-presenter'
import { FetchOpportunityUseCase } from '@/domain/portal/application/use-cases/opportunities/fetch-opportunities'

const fetchManyOpportunitiesQuerySchema = z.object({
  perPage: z.coerce.number().min(1).default(8),
  page: z.coerce.number().min(1).default(1),
  amount: z.coerce.number().min(1).default(1),
  local: z.string().default(''),
  title: z.string().default(''),
  status: z
    .enum(['CREATED', 'PENDING', 'CLOSED', 'DISABLED'])
    .default('CREATED'),
})

type FetchManyOpportunitiesQuerySchema = z.infer<
  typeof fetchManyOpportunitiesQuerySchema
>

export class FetchManyOpportunitiesController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { amount, local, page, perPage, title, status } =
      ZodValidationPipe.transform<FetchManyOpportunitiesQuerySchema>(
        fetchManyOpportunitiesQuerySchema,
        req.query,
      )
    const fetchOpportunityUseCase = container.resolve(FetchOpportunityUseCase)

    const response = await fetchOpportunityUseCase.execute({
      amount,
      local,
      page,
      perPage,
      title,
      status,
    })

    if (response.isRight()) {
      const opportunities = OpportunityPresenter.toManyHTTP(
        response.value.opportunities,
      )
      return res.status(200).send({
        status: 200,
        message: 'fetch opportunities',
        data: opportunities,
        totalElements: response.value.totalElements,
        totalPages: response.value.totalPages,
        isLast: response.value.isLast,
      })
    }
  }
}
