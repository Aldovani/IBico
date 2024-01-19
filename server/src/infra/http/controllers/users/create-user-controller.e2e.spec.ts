import request from 'supertest'
import { app } from '@/infra/app'

describe('[E2E] Create user', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create an user', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'Aldovani',
      username: 'aldovani',
      cpf: '52106796838',
      password: 'Senha1234.',
      cellphone: '5516994175820',
    })

    expect(response.status).toBe(201)
  })
})
