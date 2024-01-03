import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export type CandidateProps = {
  username: string
  name: string
  avatar: string | null
  rating: number
}

export class Candidate extends Entity<CandidateProps> {
  static create(props: CandidateProps, id?: UniqueEntityId) {
    const candidate = new Candidate(
      {
        ...props,
      },
      id,
    )

    return candidate
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

  get rating() {
    return this.props.rating
  }
}
