import { UniqueEntityId } from './unique-entity-id'

export class Entity<T> {
  private _id: UniqueEntityId
  protected props: T

  protected constructor(props: T, id?: UniqueEntityId) {
    this._id = id ?? new UniqueEntityId()
    this.props = props
  }

  get id() {
    return this._id
  }

  public equals(entity: Entity<any>) {
    if (entity === this) {
      return true
    }

    if (entity.id === this._id) {
      return true
    }

    return false
  }
}
