import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { DeleteAvatarUseCase } from '@/domain/portal/application/use-cases/users/delete-avatar'

export class DeleteAvatarController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const deleteAvatarUseCase = container.resolve(DeleteAvatarUseCase)

    const response = await deleteAvatarUseCase.execute({
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
      return res.status(200).send({
        status: 200,
        message: 'avatar updated',
      })
    }
  }
}
