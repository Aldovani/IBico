import { IUsersRepository } from '@/domain/portal/application/repositories/users-repository'
import { container } from 'tsyringe'
import { PrismaUserRepository } from './prisma-user-repository'
import { PrismaUserSkillRepository } from './prisma-user-skill-repository'
import { IUserSkillsRepository } from '@/domain/portal/application/repositories/user-skills-repository'
import { PrismaSkillRepository } from './prisma-skill-repository'
import { ISkillsRepository } from '@/domain/portal/application/repositories/skills-repository'
import { IOpportunitySkillsRepository } from '@/domain/portal/application/repositories/opportunity-skills-repository'
import { PrismaOpportunitySkillRepository } from './prisma-opportunity-skill-repository '
import { IOpportunitiesRepository } from '@/domain/portal/application/repositories/opportunities-repository'
import { PrismaOpportunityRepository } from './prisma-opportunity-repository'
import { ICandidaturesRepository } from '@/domain/portal/application/repositories/candidatures-repository'
import { PrismaCandidatureRepository } from './prisma-candidature-repository'
import { IReviewsRepository } from '@/domain/portal/application/repositories/reviews-repository'
import { PrismaReviewRepository } from './prisma-review-repository'
import { IPasswordCodeRepository } from '@/domain/portal/application/repositories/password-code-repository'
import { PrismaPasswordCodeRepository } from './prisma-password-code-repository'
import { IPasswordResetRepository } from '@/domain/portal/application/repositories/password-reset-repository'
import { PrismaPasswordResetRepository } from './prisma-password-reset-repository'

container.registerSingleton<IUsersRepository>(
  'UserRepository',
  PrismaUserRepository,
)

container.registerSingleton<IUserSkillsRepository>(
  'UserSkillRepository',
  PrismaUserSkillRepository,
)

container.registerSingleton<ISkillsRepository>(
  'SkillRepository',
  PrismaSkillRepository,
)

container.registerSingleton<IOpportunitiesRepository>(
  'OpportunityRepository',
  PrismaOpportunityRepository,
)

container.registerSingleton<IOpportunitySkillsRepository>(
  'OpportunitySkillRepository',
  PrismaOpportunitySkillRepository,
)

container.registerSingleton<ICandidaturesRepository>(
  'CandidatureRepository',
  PrismaCandidatureRepository,
)

container.registerSingleton<IReviewsRepository>(
  'ReviewRepository',
  PrismaReviewRepository,
)

container.registerSingleton<IPasswordCodeRepository>(
  'PasswordCodeRepository',
  PrismaPasswordCodeRepository,
)

container.registerSingleton<IPasswordResetRepository>(
  'PasswordResetRepository',
  PrismaPasswordResetRepository,
)
