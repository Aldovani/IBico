import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { DeleteUserUseCase } from '@/domain/portal/application/use-cases/users/delete-user'

export class DeleteUserController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const deleteUserUseCase = container.resolve(DeleteUserUseCase)

    const userId = req.user.id

    const response = await deleteUserUseCase.execute({
      userId,
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
        message: 'User deleted',
      })
    }
  }
}
