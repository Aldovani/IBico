import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export type AuthorProps = {
  username: string
  name: string
  avatar: string | null
}

export class Author extends Entity<AuthorProps> {
  static create(props: AuthorProps, id?: UniqueEntityId) {
    const author = new Author(
      {
        ...props,
      },
      id,
    )

    return author
  }

  get name() {
    return this.props.name
  }

  get username() {
    return this.props.username
  }

  get avatar() {
    return this.props.avatar
  }
}
