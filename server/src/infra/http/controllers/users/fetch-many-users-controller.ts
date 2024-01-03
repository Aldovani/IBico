import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { UserPresenter } from '../../presenters/user-presenter'
import { FetchUsersUseCase } from '@/domain/portal/application/use-cases/users/fetch-users'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

const fetchUsersQuerySchema = z.object({
  perPage: z.coerce.number().default(8),
  page: z.coerce.number().default(1),
  username: z.coerce.string().default(''),
})

type FetchUsersQuerySchema = z.infer<typeof fetchUsersQuerySchema>

export class FetchUsersController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { page, perPage, username } =
      ZodValidationPipe.transform<FetchUsersQuerySchema>(
        fetchUsersQuerySchema,
        req.query,
      )

    const fetchUsersUseCase = container.resolve(FetchUsersUseCase)

    const response = await fetchUsersUseCase.execute({
      page,
      perPage,
      username,
    })

    if (response.isRight()) {
      const users = UserPresenter.toManyHTTP(response.value.users)

      return res.status(200).send({
        status: 200,
        message: 'User funded',
        data: users,
      })
    }
  }
}
