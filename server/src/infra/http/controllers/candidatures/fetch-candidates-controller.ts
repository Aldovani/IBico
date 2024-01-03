import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { CandidaturePresenter } from '../../presenters/candidature-presenter'
import { FetchCandidatesUseCase } from '@/domain/portal/application/use-cases/candidatures/fetch-candidates'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/erros/not-allowed-error'

const fetchCandidatesQuerySchema = z.object({
  page: z.coerce.number().default(1),
  perPage: z.coerce.number().default(10),
})
const fetchCandidatesParamsSchema = z.object({
  opportunityId: z.coerce.string().uuid(),
})

type FetchCandidatesQuerySchema = z.infer<typeof fetchCandidatesQuerySchema>
type FetchCandidatesParamsSchema = z.infer<typeof fetchCandidatesParamsSchema>

export class FetchCandidatesController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { page, perPage } =
      ZodValidationPipe.transform<FetchCandidatesQuerySchema>(
        fetchCandidatesQuerySchema,
        req.query,
      )
    const { opportunityId } =
      ZodValidationPipe.transform<FetchCandidatesParamsSchema>(
        fetchCandidatesParamsSchema,
        req.params,
      )

    const fetchCandidatesUseCase = container.resolve(FetchCandidatesUseCase)

    const response = await fetchCandidatesUseCase.execute({
      userId: req.user.id,
      page,
      perPage,
      opportunityId,
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
      const candidatures = CandidaturePresenter.toManyCandidatesHTTP(
        response.value.candidates,
      )
      return res.status(200).send({
        status: 200,
        message: 'Fetch candidates',
        data: candidatures,
        totalElements: response.value.totalElements,
        totalPages: response.value.totalPages,
        isLast: response.value.isLast,
      })
    }
  }
}
