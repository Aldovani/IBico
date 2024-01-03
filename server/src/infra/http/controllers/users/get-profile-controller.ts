import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { UserPresenter } from '../../presenters/user-presenter'
import { GetProfileUseCase } from '@/domain/portal/application/use-cases/users/get-profile'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

const getProfileParamsSchema = z.object({
  username: z.string(),
})

type GetProfileParamsSchema = z.infer<typeof getProfileParamsSchema>

export class GetProfileController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const getProfileUseCase = container.resolve(GetProfileUseCase)
    const { username } = ZodValidationPipe.transform<GetProfileParamsSchema>(
      getProfileParamsSchema,
      req.params,
    )

    const response = await getProfileUseCase.execute({
      username,
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
      const user = UserPresenter.toProfileHTTP(response.value.user)

      return res.status(200).send({
        status: 200,
        message: 'User funded',
        data: {
          ...user,
        },
        totalOpportunities: response.value.totalOpportunities,
        totalServices: response.value.totalServices,
      })
    }
  }
}
