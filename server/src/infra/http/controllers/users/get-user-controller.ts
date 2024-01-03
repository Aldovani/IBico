import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { UserPresenter } from '../../presenters/user-presenter'
import { GetUserUseCase } from '@/domain/portal/application/use-cases/users/get-user'

export class GetUserController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const getUserUseCase = container.resolve(GetUserUseCase)
    const response = await getUserUseCase.execute({
      userId: req.user.id,
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
      const user = UserPresenter.toHTTP(response.value.user)

      return res.status(200).send({
        status: 200,
        message: 'User funded',
        data: user,
      })
    }
  }
}
