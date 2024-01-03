import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export type PasswordResetProps = {
  createdAt: Date
  expiresAt: Date
  requestId: UniqueEntityId
  used: boolean
}

export class PasswordReset extends Entity<PasswordResetProps> {
  static create(
    props: Optional<PasswordResetProps, 'used' | 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const passwordResetPasswordReset = new PasswordReset(
      {
        ...props,
        createdAt: new Date(),
        used: props.used || false,
      },
      id,
    )

    return passwordResetPasswordReset
  }

  get requestId() {
    return this.props.requestId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get expiresAt() {
    return this.props.expiresAt
  }

  get used() {
    return this.props.used
  }

  set used(used: boolean) {
    this.props.used = used
  }
}
