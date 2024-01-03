import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { UserPresenter } from '../../presenters/user-presenter'
import { AuthenticateUseCase } from '@/domain/portal/application/use-cases/users/authenticate'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { InvalidCredencialError } from '@/domain/portal/application/use-cases/users/errors/invalid-credencial-error'

const authenticateBodySchema = z.object({
  cpf: z.string(),
  password: z.string().min(8),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

export class AuthenticateController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { cpf, password } =
      ZodValidationPipe.transform<AuthenticateBodySchema>(
        authenticateBodySchema,
        req.body,
      )

    const authenticateUseCase = container.resolve(AuthenticateUseCase)

    const response = await authenticateUseCase.execute({
      cpf,
      password,
    })

    if (response.isLeft()) {
      const error = response.value

      switch (error.constructor) {
        case InvalidCredencialError:
          return res.status(404).send({
            status: 404,
            message: error.message,
          })
      }
    }

    if (response.isRight()) {
      const user = UserPresenter.toHTTP(response.value.user)
      const token = await res.jwtSign(
        { id: user.id, username: user.username },
        { sign: { sub: user.id } },
      )

      const refreshToken = await res.jwtSign(
        { id: user.id, username: user.username },
        { sign: { sub: user.id, expiresIn: '15d' } },
      )

      return res
        .status(200)
        .setCookie('refreshToken', refreshToken, {
          path: '/',
          secure: true,
          httpOnly: true,
          sameSite: true,
          signed: false,
          maxAge: 60 * 60 * 24,
        })
        .setCookie('token', token, {
          path: '/',
          secure: true,
          httpOnly: true,
          sameSite: true,
          signed: false,
          maxAge: 60 * 60,
        })
        .send({
          status: 200,
          message: 'Authenticated',
        })
    }
  }
}
