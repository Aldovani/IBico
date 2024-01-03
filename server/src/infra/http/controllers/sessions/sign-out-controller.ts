import { FastifyReply, FastifyRequest } from 'fastify'

export class SignOutController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    return res
      .status(200)
      .clearCookie('refreshToken', {
        path: '/',
        secure: true,
        httpOnly: true,
        sameSite: true,
      })
      .clearCookie('token', {
        path: '/',
        secure: true,
        httpOnly: true,
        sameSite: true,
      })
      .send({
        status: 200,
        message: 'sign out',
      })
  }
}
