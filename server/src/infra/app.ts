import 'reflect-metadata'
import './database/prisma/'
import '@/core/containers/providers'

import fastify from 'fastify'
import fastifyJWT from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import fastifyStatic from '@fastify/static'
import fastifymulter from 'fastify-multer'
import cors from '@fastify/cors'

import { routes } from './http/routes'
import { BadRequestException } from '@/core/errors/erros/bad-request-exception'
import { env } from './env'
import path from 'path'

export const app = fastify({
  logger: true,
})

app.register(fastifyJWT, {
  secret: env.JWT_SECRET_ACCESS,
  sign: {
    expiresIn: '60m',
  },
  cookie: {
    cookieName: 'token',
    signed: false,
  },
})
app.register(fastifymulter.contentParser)

app.register(cors, {
  credentials: true,
  origin: ['http://localhost:3000'],
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
})
app.register(fastifyCookie)
app.register(routes)

app.register(fastifyStatic, {
  root: path.join(__dirname, '..', '..', 'tmp', 'avatar'),
  prefix: '/public/', // optional: default '/'
})

app.setErrorHandler(function (error, request, reply) {
  if (error instanceof BadRequestException) {
    reply.status(400).send({
      status: 400,
      message: error.message,
      error: error.errors,
    })
  } else {
    console.error(error.message)
    reply.status(500).send(error.message)
  }
})
