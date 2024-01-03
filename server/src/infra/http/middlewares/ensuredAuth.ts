import { FastifyReply, FastifyRequest } from 'fastify'

export async function ensuredAuth(req: FastifyRequest, rep: FastifyReply) {
  try {
    await req.jwtVerify({
      onlyCookie: true,
    })
  } catch (err) {
    let code: string

    switch (err.code) {
      case 'FST_JWT_AUTHORIZATION_TOKEN_INVALID':
        code = 'token.invalid'
        break
      case 'FST_JWT_AUTHORIZATION_TOKEN_EXPIRED':
        code = 'token.expired'
        break
      default:
        code = 'token.invalid'
        break
    }

    return rep.status(401).send({
      status: 401,
      message: 'unauthorized',
      code,
      error: err,
    })
  }
}
