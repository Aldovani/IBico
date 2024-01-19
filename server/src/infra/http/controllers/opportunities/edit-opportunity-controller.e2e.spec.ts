import request from 'supertest'
import { app } from '@/infra/app'
import { faker } from '@faker-js/faker'

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

    await request(app.server)
      .post('/opportunities')
      .set('Cookie', headers['set-cookie'])
      .send({
        amount: faker.number.int(),
        description: faker.lorem.sentence(20),
        local: faker.location.city(),
        title: faker.lorem.text(),
        endDateTime: '10/01/2024',
        startDateTime: '09/01/2024',
        timeLoad: faker.lorem.text(),
        skills: ['teste'],
      })

    const myOpportunities = await request(app.server).get('/opportunities/me')

    console.log({ oppotunity: myOpportunities.body })

    const opportunityId = myOpportunities.body.data[0].id

    await request(app.server)
      .put(`/opportunities/${opportunityId}`)
      .set('Cookie', headers['set-cookie'])
      .send({
        amount: faker.number.int(),
        description: faker.lorem.sentence(20),
        local: faker.location.city(),
        title: faker.lorem.text(),
        startDateTime: '19/01/2024',
        endDateTime: '20/01/2024',
        timeLoad: faker.lorem.text(),
        skills: ['teste', 'test-2'],
      })
  })
})
