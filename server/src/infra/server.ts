import { env } from '@/infra/env'
import { app as server } from './app'

server
  .listen({
    port: env.PORT,
    // host: '0.0.0.0',
  })
  .then(() => {
    console.log('server is running 🔥')
  })
  .catch((e) => {
    console.log('Error server ❌')
  })
