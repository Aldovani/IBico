import { Either, left, right } from '@/core/types/either'
import { ResourceAlreadyExists } from '@/core/errors/erros/resource-already-exists'
import { User } from '@/domain/portal/enterprise/entities/user'
import { IUsersRepository } from '../../repositories/users-repository'
import { ISkillsRepository } from '../../repositories/skills-repository'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { IEncryptProvider } from '@/core/containers/providers/encryptProvider/IEncryptProvider'
import { Skill } from '@/domain/portal/enterprise/entities/skill'
import { IUserSkillsRepository } from '../../repositories/user-skills-repository'
import { UserSkillList } from '@/domain/portal/enterprise/entities/user-skill-list'
import { UserSkill } from '@/domain/portal/enterprise/entities/user-skill'
import { UsernameAlreadyExistsError } from './errors/username-already-exists-error'
import { CPFAlreadyExistsError } from './errors/cpf-already-exists-error'
import { InvalidCredencialError } from './errors/invalid-credencial-error'
import { inject, injectable } from 'tsyringe'

type EditUserRequest = {
  userId: string
  name: string
  cellphone: string
  skills: string[]
  active: boolean

  username: string
  cpf: string
  currentPassword?: string
  newPassword?: string
}

type EditUserResponse = Either<
  ResourceAlreadyExists | ResourceNotFoundError | InvalidCredencialError,
  {
    user: User
  }
>

@injectable()
export class EditUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
    @inject('EncryptProvider')
    private encryptProvider: IEncryptProvider,
    @inject('UserSkillRepository')
    private userSkillRepository: IUserSkillsRepository,
    @inject('SkillRepository')
    private skillRepository: ISkillsRepository,
  ) {}

  async execute({
    cellphone,
    cpf,
    name,
    skills,
    username,
    active,
    currentPassword,
    newPassword,
    userId,
  }: EditUserRequest): Promise<EditUserResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    if (user.username !== username) {
      const userWithTheUsername =
        await this.userRepository.findByUsername(username)

      if (userWithTheUsername) {
        return left(new UsernameAlreadyExistsError(username))
      }

      user.username = username
    }

    if (user.cpf !== cpf) {
      const userWithTheCPF = await this.userRepository.findByCPF(cpf)

      if (userWithTheCPF) {
        return left(new CPFAlreadyExistsError(cpf))
      }

      user.cpf = cpf
    }

    if (currentPassword && newPassword) {
      const isPasswordMathWithPasswordHashed =
        await this.encryptProvider.compare(currentPassword, user.password)

      if (!isPasswordMathWithPasswordHashed) {
        return left(new InvalidCredencialError())
      }

      const newPasswordHashed = await this.encryptProvider.hash(newPassword)
      user.password = newPasswordHashed
    }

    const currentSkills =
      await this.userSkillRepository.findManyByUserId(userId)

    const skillsList = new UserSkillList(currentSkills)

    const skillWithNotItemDuplicated = Array.from(new Set(skills))

    const newSkill = await Promise.all(
      skillWithNotItemDuplicated.map(async (skill) => {
        let skillExists = await this.skillRepository.findByName(skill)

        if (!skillExists) {
          skillExists = Skill.create({
            name: skill,
          })

          await this.skillRepository.create(skillExists)
        }

        const userSkill = UserSkill.create({
          skillId: skillExists.id,
          userId: user.id,
          name: skill || '',
        })

        return userSkill
      }),
    )

    skillsList.update(newSkill)

    user.skills = skillsList
    user.cellphone = cellphone
    user.active = active
    user.name = name

    await this.userRepository.save(user)

    return right({
      user,
    })
  }
}
