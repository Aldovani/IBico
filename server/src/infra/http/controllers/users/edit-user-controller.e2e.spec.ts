import request from 'supertest'
import { app } from '@/infra/app'

describe('[E2E] Edit user', async () => {
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
      .put('/users')
      .set('Cookie', headers['set-cookie'])
      .send({
        name: 'Aldovani',
        username: 'aldovani',
        cpf: '52106796838',
        cellphone: '5516994175820',
        active: true,
        skills: ['teste'],
      })
    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        status: 200,
        message: 'user edited',
      }),
    )
  })
})
