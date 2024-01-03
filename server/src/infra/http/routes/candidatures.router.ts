import { FastifyInstance } from 'fastify'
import { CreateCandidatureOpportunityController } from '../controllers/candidatures/create-candidature-controller'
import { ensuredAuth } from '../middlewares/ensuredAuth'
import { DeleteCandidateOpportunityController } from '../controllers/candidatures/delete-candidature-controller'
import { FetchMyCandidaturesController } from '../controllers/candidatures/fetch-my-candidatures-controller'
import { FetchCandidatesController } from '../controllers/candidatures/fetch-candidates-controller'
import { GetCandidatureController } from '../controllers/candidatures/get-candidature-controller'

const createCandidateOpportunityController =
  new CreateCandidatureOpportunityController()
const deleteCandidateOpportunityController =
  new DeleteCandidateOpportunityController()
const fetchMyCandidaturesController = new FetchMyCandidaturesController()
const fetchCandidatesController = new FetchCandidatesController()
const getCandidatureController = new GetCandidatureController()

export async function candidaturesRoutes(app: FastifyInstance) {
  app.post(
    '/candidatures/:opportunityId',
    { onRequest: [ensuredAuth] },
    createCandidateOpportunityController.handle,
  )
  app.delete(
    '/candidatures/:candidatureId',
    { onRequest: [ensuredAuth] },
    deleteCandidateOpportunityController.handle,
  )
  app.get(
    '/candidatures',
    { onRequest: [ensuredAuth] },
    fetchMyCandidaturesController.handle,
  )
  app.get(
    '/candidatures/:opportunityId/candidates',
    { onRequest: [ensuredAuth] },
    fetchCandidatesController.handle,
  )
  app.get(
    '/candidatures/:opportunityId',
    { onRequest: [ensuredAuth] },
    getCandidatureController.handle,
  )
}
