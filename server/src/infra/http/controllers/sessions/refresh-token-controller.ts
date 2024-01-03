import { app } from '@/infra/app'
import { FastifyReply, FastifyRequest } from 'fastify'

export class RefreshTokenController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const { refreshToken: cookieRefreshToken } = req.cookies
      const { id, username } = app.jwt.verify(cookieRefreshToken || '') as {
        id: string
        username: string
      }

      const token = await res.jwtSign({ id, username }, { sign: { sub: id } })

      const refreshToken = await res.jwtSign(
        { id, username },
        { sign: { sub: id, expiresIn: '1d' } },
      )

      return res
        .status(200)
        .setCookie('refreshToken', refreshToken, {
          path: '/',
          secure: true,
          httpOnly: true,
          sameSite: true,
          maxAge: 60 * 60 * 24,
        })
        .setCookie('token', token, {
          path: '/',
          secure: true,
          httpOnly: true,
          sameSite: true,
          maxAge: 60 * 60,
        })
        .send({
          status: 200,
          message: 'token refreshed',
        })
    } catch (err) {
      return res.status(401).send({
        status: 401,
        message: 'unauthorized',
        error: 'refresh token invalid',
        code: 'refresh.token.invalid',
      })
    }
  }
}
