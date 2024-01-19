import request from 'supertest'
import { app } from '@/infra/app'

describe('[E2E] Get profile', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to edit an user', async () => {
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
      .get('/users/profile/aldovani')
      .set('Cookie', headers['set-cookie'])

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        status: 200,
        message: 'User funded',
        data: expect.any(Object),
      }),
    )
  })
})
