import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { ValidateCodeUseCase } from '@/domain/portal/application/use-cases/users/validate-code'
import { ResourceExpiredError } from '@/core/errors/erros/resource-expired-error'
import { ResourceAlreadyUsedError } from '@/core/errors/erros/resource-already-used-error'

const validateCodeBodySchema = z.object({
  code: z.string().min(6).max(6),
  requestId: z.string().uuid(),
})

type ValidateCodeBodySchema = z.infer<typeof validateCodeBodySchema>

export class ValidateCodeController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { code, requestId } =
      ZodValidationPipe.transform<ValidateCodeBodySchema>(
        validateCodeBodySchema,
        req.body,
      )

    const validateCodeUseCase = container.resolve(ValidateCodeUseCase)

    const response = await validateCodeUseCase.execute({
      code,
      requestId,
    })

    if (response.isLeft()) {
      const error = response.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          return res.status(404).send({
            status: 404,
            message: error.message,
          })
        case ResourceExpiredError:
          return res.status(400).send({
            status: 400,
            message: error.message,
          })
        case ResourceAlreadyUsedError:
          return res.status(400).send({
            status: 400,
            message: error.message,
          })
      }
    }

    if (response.isRight()) {
      return res.status(200).send({
        status: 200,
        message: 'password reset generated',
        requestId: response.value.requestId,
      })
    }
  }
}
