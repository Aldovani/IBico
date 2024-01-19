import request from 'supertest'
import { app } from '@/infra/app'

describe('[E2E] Authenticate', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to Authenticate', async () => {
    await request(app.server).post('/users').send({
      name: 'Aldovani',
      username: 'aldovani',
      cpf: '52106796838',
      password: 'Senha1234.',
      cellphone: '5516994175820',
    })

    const response = await request(app.server).post('/sessions').send({
      cpf: '52106796838',
      password: 'Senha1234.',
    })

    expect(response.status).toBe(200)

    console.log(response.body)
    expect(response.body).toEqual({ status: 200, message: 'Authenticated' })
  })
})
