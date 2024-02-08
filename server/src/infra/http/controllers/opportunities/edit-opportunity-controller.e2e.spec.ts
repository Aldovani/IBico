import request from 'supertest'
import { app } from '@/infra/app'
import { faker } from '@faker-js/faker'
import { DayjsDateProvider } from '@/core/containers/providers/dateProvider/implementations/day-js-date-provider'
const DayjsDate = new DayjsDateProvider()
describe('[E2E] Edit opportunity', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to edit an opportunity', async () => {
    await request(app.server).post('/users').send({
      name: 'Aldovani',
      username: 'aldovani',
      cpf: '52106796838',
      password: 'Senha1234.',
      cellphone: '5516994175820',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      cpf: '52106796838',
      password: 'Senha1234.',
    })

    const { headers } = authResponse

    const response = await request(app.server)
      .post('/opportunities')
      .set('Cookie', headers['set-cookie'])
      .send({
        amount: 10,
        description: faker.lorem.sentence(20),
        local: faker.location.city(),
        title: faker.lorem.text(),
        startDateTime: new Date(),
        endDateTime: DayjsDate.addDays(new Date(), 5),
        timeLoad: faker.lorem.text(),
        skills: ['teste'],
      })

    const myOpportunities = await request(app.server)
      .get('/opportunities/me')
      .set('Cookie', headers['set-cookie'])

    const opportunityId = myOpportunities.body.data[0].id

    await request(app.server)
      .put(`/opportunities/${opportunityId}`)
      .set('Cookie', headers['set-cookie'])
      .send({
        amount: faker.number.int(),
        description: faker.lorem.sentence(20),
        local: faker.location.city(),
        title: faker.lorem.text(),
        startDateTime: new Date(),
        endDateTime: DayjsDate.addDays(new Date(), 5),
        timeLoad: faker.lorem.text(),
        skills: ['teste', 'test-2'],
      })
  })
})
