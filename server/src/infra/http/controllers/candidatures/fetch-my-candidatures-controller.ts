import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { FetchCandidaturesUseCase } from '@/domain/portal/application/use-cases/candidatures/fetch-candidatures'
import { CandidaturePresenter } from '../../presenters/candidature-presenter'

const fetchMyCandidaturesQuerySchema = z.object({
  page: z.coerce.number().default(1),
  perPage: z.coerce.number().default(10),
  status: z.enum(['CREATED', 'PENDING', 'CLOSED']).default('CREATED'),
})

type FetchMyCandidaturesQuerySchema = z.infer<
  typeof fetchMyCandidaturesQuerySchema
>

export class FetchMyCandidaturesController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { page, perPage, status } =
      ZodValidationPipe.transform<FetchMyCandidaturesQuerySchema>(
        fetchMyCandidaturesQuerySchema,
        req.query,
      )
    const fetchCandidaturesUseCase = container.resolve(FetchCandidaturesUseCase)

    const response = await fetchCandidaturesUseCase.execute({
      userId: req.user.id,
      page,
      perPage,
      status,
    })

    if (response.isRight()) {
      const candidatures = CandidaturePresenter.toManyHTTP(
        response.value.candidatures,
      )
      return res.status(200).send({
        status: 200,
        message: 'Candidature deleted',
        data: candidatures,
        total: response.value.totalElements,
        totalPages: response.value.totalPages,
        isLast: response.value.isLast,
      })
    }
  }
}
