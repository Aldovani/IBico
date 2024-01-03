import { CPFAlreadyExistsError } from '@/domain/portal/application/use-cases/users/errors/cpf-already-exists-error'
import { UsernameAlreadyExistsError } from '@/domain/portal/application/use-cases/users/errors/username-already-exists-error'
import { checkCPFValid } from '@/infra/utils/check-cpf-valid'
import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { EditUserUseCase } from '@/domain/portal/application/use-cases/users/edit-user'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { UserPresenter } from '../../presenters/user-presenter'
import { InvalidCredencialError } from '@/domain/portal/application/use-cases/users/errors/invalid-credencial-error'

const editUserBodySchema = z
  .object({
    cellphone: z.string().min(11),
    cpf: z
      .string()
      .min(11)
      .max(11)
      .refine((cpf) => checkCPFValid(cpf), { message: 'cpf invalid' }),
    name: z.string().min(8),

    username: z.string().min(4),
    active: z.boolean(),
    skills: z.string().array(),

    currentPassword: z
      .string()
      .min(8)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?.&])[A-Za-z\d@$!%*?.&]{8,}$/,
        'Senha deve conter letra maiúscula e minuscula , numero e um carácter especial ',
      )
      .optional(),
    newPassword: z
      .string()
      .min(8)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?.&])[A-Za-z\d@$!%*?.&]{8,}$/,
        'Senha deve conter letra maiúscula e minuscula , numero e um carácter especial ',
      )
      .optional(),
  })
  .superRefine((values, ctx) => {
    if (values.currentPassword) {
      if (!values.newPassword) {
        ctx.addIssue({
          message: 'new password is necessary',
          code: 'custom',
          path: ['currentPassword'],
          fatal: true,
        })
      }
    }

    if (values.newPassword) {
      if (!values.currentPassword) {
        ctx.addIssue({
          message: 'current password is necessary',
          code: 'custom',
          path: ['newPassword'],
          fatal: true,
        })
      }
    }
  })
type EditUserBodySchema = z.infer<typeof editUserBodySchema>

export class EditUserController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const {
      cellphone,
      cpf,
      name,
      username,
      active,
      skills,
      currentPassword,
      newPassword,
    } = ZodValidationPipe.transform<EditUserBodySchema>(
      editUserBodySchema,
      req.body,
    )
    const userId = req.user.id

    const editUserUseCase = container.resolve(EditUserUseCase)

    const response = await editUserUseCase.execute({
      cellphone,
      cpf,
      name,
      username,
      active,
      skills,
      userId,
      newPassword,
      currentPassword,
    })

    if (response.isLeft()) {
      const error = response.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          return res.status(404).send({
            status: 404,
            message: error.message,
          })
        case UsernameAlreadyExistsError:
          return res.status(403).send({
            status: 403,
            message: error.message,
          })
        case CPFAlreadyExistsError:
          return res.status(403).send({
            status: 403,
            message: error.message,
          })
        case InvalidCredencialError:
          return res.status(403).send({
            status: 403,
            message: error.message,
          })
      }
    }

    if (response.isRight()) {
      const content = UserPresenter.toHTTP(response.value.user)

      return res.status(200).send({
        status: 200,
        message: 'user edited',
        data: content,
      })
    }
  }
}
