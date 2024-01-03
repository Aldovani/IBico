import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { User, UserProps } from '@/domain/portal/enterprise/entities/user'
import { faker } from '@faker-js/faker'

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityId,
) {
  const user = User.create(
    {
      cellphone: override.cellphone || faker.phone.number(),
      name: override.name || 'john doe',
      cpf: override.cpf || '00000000000',
      password: override.password || '1234567',
      username: override.username || 'john_doe',
      active: override.active || true,
      skills: override.skills || undefined,
    },
    id,
  )

  return user
}
