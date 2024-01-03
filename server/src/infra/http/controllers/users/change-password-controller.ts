import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { ChangePasswordUseCase } from '@/domain/portal/application/use-cases/users/change-password'

const changePasswordBodySchema = z.object({
  password: z
    .string()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?.&])[A-Za-z\d@$!%*?.&]{8,}$/,
      'Senha deve conter letra maiúscula e minuscula , numero e um carácter especial ',
    ),
  requestId: z.string().uuid(),
})

type ChangePasswordBodySchema = z.infer<typeof changePasswordBodySchema>

export class ChangePasswordController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { password, requestId } =
      ZodValidationPipe.transform<ChangePasswordBodySchema>(
        changePasswordBodySchema,
        req.body,
      )

    const changePasswordUseCase = container.resolve(ChangePasswordUseCase)

    const response = await changePasswordUseCase.execute({
      password,
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
      }
    }

    if (response.isRight()) {
      return res.status(200).send({
        status: 200,
        message: 'password rested',
      })
    }
  }
}
