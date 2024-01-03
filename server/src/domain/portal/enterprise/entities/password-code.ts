import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export type PasswordCodeProps = {
  createdAt: Date
  expiresAt: Date
  userId: UniqueEntityId
  code: string
}

export class PasswordCode extends Entity<PasswordCodeProps> {
  static create(
    props: Optional<PasswordCodeProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const passwordCode = new PasswordCode(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return passwordCode
  }

  get code() {
    return this.props.code
  }

  get createdAt() {
    return this.props.createdAt
  }

  get userId() {
    return this.props.userId
  }

  get expiresAt() {
    return this.props.expiresAt
  }
}
