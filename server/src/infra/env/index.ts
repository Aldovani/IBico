import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'prod', 'test']).default('dev'),
  PORT: z.coerce.number().default(8080),
  JWT_SECRET_ACCESS: z.string().default('secret'),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Variables is required', _env.error.format())
  throw new Error('Variables is required')
}

export const env = _env.data
