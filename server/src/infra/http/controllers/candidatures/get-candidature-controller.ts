import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { GetCandidatureUseCase } from '@/domain/portal/application/use-cases/candidatures/get-candidatute'

const getCandidatureParamsSchema = z.object({
  opportunityId: z.coerce.string().uuid(),
})

type GetCandidatureParamsSchema = z.infer<typeof getCandidatureParamsSchema>

export class GetCandidatureController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { opportunityId } =
      ZodValidationPipe.transform<GetCandidatureParamsSchema>(
        getCandidatureParamsSchema,
        req.params,
      )

    const getCandidatureUseCase = container.resolve(GetCandidatureUseCase)

    const response = await getCandidatureUseCase.execute({
      userId: req.user.id,
      opportunityId,
    })

    if (response.isRight()) {
      return res.status(200).send({
        status: 200,
        message: 'get candidature',
        isCandidate: response.value.isCandidate,
      })
    }
  }
}
