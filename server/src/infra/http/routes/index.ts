import { FastifyInstance } from 'fastify'
import { usersRoutes } from './users.router'
import { sessionsRoutes } from './sessions.router'
import { opportunitiesRoutes } from './opportunities.router'
import { candidaturesRoutes } from './candidatures.router'
import { reviewsRoutes } from './reviews.router'

export async function routes(app: FastifyInstance) {
  app.register(usersRoutes)
  app.register(sessionsRoutes)
  app.register(opportunitiesRoutes)
  app.register(candidaturesRoutes)
  app.register(reviewsRoutes)
}
