import { FastifyInstance } from 'fastify'
import { AuthenticateController } from '../controllers/sessions/authenticate-controller'
import { SignOutController } from '../controllers/sessions/sign-out-controller'
import { RefreshTokenController } from '../controllers/sessions/refresh-token-controller'

const authenticateController = new AuthenticateController()
const signOutController = new SignOutController()
const refreshTokenController = new RefreshTokenController()

export async function sessionsRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticateController.handle)
  app.post('/sessions/refresh', refreshTokenController.handle)
  app.delete('/sessions', signOutController.handle)
}
