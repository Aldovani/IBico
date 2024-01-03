import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { ChooseCandidateOpportunityUseCase } from '@/domain/portal/application/use-cases/opportunities/choose-candidate'
import { NotAllowedError } from '@/core/errors/erros/not-allowed-error'
import { CandidateAlreadySelectedError } from '@/domain/portal/application/use-cases/opportunities/errors/candidate-already-selected-error'

const chooseCandidateOpportunityParamsSchema = z.object({
  candidateId: z.string().uuid(),
  opportunityId: z.string().uuid(),
})

type ChooseCandidateOpportunityParamsSchema = z.infer<
  typeof chooseCandidateOpportunityParamsSchema
>

export class ChooseCandidateOpportunityController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { candidateId, opportunityId } =
      ZodValidationPipe.transform<ChooseCandidateOpportunityParamsSchema>(
        chooseCandidateOpportunityParamsSchema,
        req.params,
      )
    const chooseCandidateOpportunityUseCase = container.resolve(
      ChooseCandidateOpportunityUseCase,
    )

    const response = await chooseCandidateOpportunityUseCase.execute({
      opportunityId,
      candidateId,
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
        case CandidateAlreadySelectedError:
          return res.status(404).send({
            status: 404,
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
