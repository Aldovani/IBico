import request from 'supertest'
import { app } from '@/infra/app'
import { faker } from '@faker-js/faker'

describe('[E2E] Create opportunity', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create an opportunity', async () => {
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
        amount: faker.number.int(),
        description: faker.lorem.sentence(20),
        local: faker.location.city(),
        title: faker.lorem.text(),
        endDateTime: '10/01/2024',
        startDateTime: '09/01/2024',
        timeLoad: faker.lorem.text(),
        skills: ['teste'],
      })
    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      status: 201,
      message: 'Opportunity created',
    })
  })
})
