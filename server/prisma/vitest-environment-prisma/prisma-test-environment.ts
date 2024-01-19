import type { Environment } from 'vitest'

import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    const uuid = randomUUID().replace(/(-)/g, '')
    const databaseName = `ibico_test_${uuid}`
    process.env.DATABASE_URL = `mysql://root:root@localhost:3306/${databaseName}`
    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(`DROP DATABASE ${databaseName};`)
        await prisma.$disconnect()
      },
    }
  },
}
