import { CreateUserUseCase } from '@/domain/portal/application/use-cases/users/create-user'
import { CPFAlreadyExistsError } from '@/domain/portal/application/use-cases/users/errors/cpf-already-exists-error'
import { UsernameAlreadyExistsError } from '@/domain/portal/application/use-cases/users/errors/username-already-exists-error'
import { checkCPFValid } from '@/infra/utils/check-cpf-valid'
import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

const createUserBodySchema = z.object({
  cellphone: z.string().min(11),
  cpf: z
    .string()
    .min(11)
    .max(11)
    .refine((cpf) => checkCPFValid(cpf), { message: 'cpf invalid' }),
  name: z.string().min(8),
  password: z
    .string()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?.&])[A-Za-z\d@$!%*?.&]{8,}$/,
      'Senha deve conter letra maiúscula e minuscula , numero e um carácter especial ',
    ),
  username: z.string().min(4),
})
type CreateUserBodySchema = z.infer<typeof createUserBodySchema>

export class CreateUserController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { cellphone, cpf, name, password, username } =
      ZodValidationPipe.transform<CreateUserBodySchema>(
        createUserBodySchema,
        req.body,
      )

    const createUserUseCase = container.resolve(CreateUserUseCase)

    const response = await createUserUseCase.execute({
      cellphone,
      cpf,
      name,
      password,
      username,
    })

    if (response.isLeft()) {
      const error = response.value

      switch (error.constructor) {
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
      }
    }

    if (response.isRight()) {
      return res.status(201).send({
        status: 201,
        message: 'user created',
      })
    }
  }
}
