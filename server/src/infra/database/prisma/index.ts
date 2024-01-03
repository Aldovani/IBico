import { PrismaClient } from '@prisma/client'

import './services'
import './repositories'

export const prisma = new PrismaClient()
