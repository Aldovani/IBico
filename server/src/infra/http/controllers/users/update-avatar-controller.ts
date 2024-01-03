import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { UpdateAvatarUseCase } from '@/domain/portal/application/use-cases/users/update-avatar'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'

export class UpdateAvatarController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const updateAvatarUseCase = container.resolve(UpdateAvatarUseCase)

    const file = req.file
    const response = await updateAvatarUseCase.execute({
      file: file.filename,
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
