import { container } from 'tsyringe'
import { PrismaService } from './prisma-service'

container.registerSingleton('PrismaService', PrismaService)
