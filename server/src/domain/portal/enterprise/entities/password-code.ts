import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export type PasswordCodeProps = {
  createdAt: Date
  expiresAt: Date
  userId: UniqueEntityId
  code: string
  used: boolean
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
        used: props.used || false,
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

  set expiresAt(data: Date) {
    this.expiresAt = data
  }

  get used() {
    return this.props.used
  }

  set used(value: boolean) {
    this.props.used = value
  }
}
