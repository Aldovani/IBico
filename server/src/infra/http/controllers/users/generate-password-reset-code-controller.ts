import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { z } from 'zod'
import { checkCPFValid } from '@/infra/utils/check-cpf-valid'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { GeneratePasswordResetCodeUseCase } from '@/domain/portal/application/use-cases/users/generate-password-reset-code'

const generatePasswordResetCodeBodySchema = z.object({
  cpf: z
    .string()
    .min(11)
    .max(11)
    .refine((cpf) => checkCPFValid(cpf), { message: 'cpf invalid' }),
})

type GeneratePasswordResetCodeBodySchema = z.infer<
  typeof generatePasswordResetCodeBodySchema
>

export class GeneratePasswordResetCodeController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { cpf } =
      ZodValidationPipe.transform<GeneratePasswordResetCodeBodySchema>(
        generatePasswordResetCodeBodySchema,
        req.body,
      )

    const generatePasswordResetCodeUseCase = container.resolve(
      GeneratePasswordResetCodeUseCase,
    )

    const response = await generatePasswordResetCodeUseCase.execute({
      cpf,
    })

    if (response.isLeft()) {
      const error = response.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          return res.status(404).send({
            status: 404,
            message: error.message,
          })
      }
    }

    if (response.isRight()) {
      return res.status(200).send({
        status: 200,
        message: 'password code generated',
        requestId: response.value.requestId,
      })
    }
  }
}
