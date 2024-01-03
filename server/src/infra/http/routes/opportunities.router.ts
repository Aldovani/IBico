import { FastifyInstance } from 'fastify'
import { CreateOpportunityController } from '../controllers/opportunities/create-opportunity-controller'
import { ensuredAuth } from '../middlewares/ensuredAuth'
import { EditOpportunityController } from '../controllers/opportunities/edit-opportunity-controller'
import { FetchManyOpportunitiesController } from '../controllers/opportunities/fetch-many-opportunities-controller'
import { GetOpportunityController } from '../controllers/opportunities/get-opportunity-controller'
import { FetchMyOpportunitiesController } from '../controllers/opportunities/fetch-my-opportunities-controller'
import { DeleteOpportunityController } from '../controllers/opportunities/delete-opportunity-controller'
import { ChooseCandidateOpportunityController } from '../controllers/opportunities/choose-candidate-opportunity-controller'
import { EditStatusOpportunityController } from '../controllers/opportunities/edit-status-opportunity-controller'

const createOpportunityController = new CreateOpportunityController()
const editOpportunityController = new EditOpportunityController()
const editStatusOpportunityController = new EditStatusOpportunityController()
const fetchManyOpportunitiesController = new FetchManyOpportunitiesController()
const getOpportunityController = new GetOpportunityController()
const fetchMyOpportunitiesController = new FetchMyOpportunitiesController()
const deleteOpportunityController = new DeleteOpportunityController()
const chooseCandidateOpportunityController =
  new ChooseCandidateOpportunityController()

export async function opportunitiesRoutes(app: FastifyInstance) {
  app.post(
    '/opportunities',
    {
      onRequest: [ensuredAuth],
    },
    createOpportunityController.handle,
  )

  app.put(
    '/opportunities/:id',
    {
      onRequest: [ensuredAuth],
    },
    editOpportunityController.handle,
  )

  app.get(
    '/opportunities',
    {
      onRequest: [ensuredAuth],
    },
    fetchManyOpportunitiesController.handle,
  )
  app.get(
    '/opportunities/:id',
    {
      onRequest: [ensuredAuth],
    },
    getOpportunityController.handle,
  )
  app.get(
    '/opportunities/me',
    {
      onRequest: [ensuredAuth],
    },
    fetchMyOpportunitiesController.handle,
  )

  app.delete(
    '/opportunities/:id',
    {
      onRequest: [ensuredAuth],
    },
    deleteOpportunityController.handle,
  )
  app.post(
    '/opportunities/:opportunityId/candidates/:candidateId',
    {
      onRequest: [ensuredAuth],
    },
    chooseCandidateOpportunityController.handle,
  )
  app.put(
    '/opportunities/:opportunityId/:status',
    {
      onRequest: [ensuredAuth],
    },
    editStatusOpportunityController.handle,
  )
}
