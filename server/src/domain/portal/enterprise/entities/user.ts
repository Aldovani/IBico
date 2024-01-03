import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { UserSkillList } from './user-skill-list'

export type UserProps = {
  name: string
  username: string
  cpf: string
  cellphone: string
  password: string
  active: boolean
  avatar: string | null
  rating: number
  createdAt: Date
  skills: UserSkillList
}

export class User extends Entity<UserProps> {
  static create(
    props: Optional<UserProps, 'createdAt' | 'active' | 'avatar' | 'rating'>,
    id?: UniqueEntityId,
  ) {
    const user = new User(
      {
        ...props,
        skills: props.skills || new UserSkillList(),
        active: true,
        rating: 5,
        avatar: props.avatar || null,
        createdAt: new Date(),
      },
      id,
    )

    return user
  }

  get avatar() {
    return this.props.avatar
  }

  set avatar(avatar: string | null) {
    this.props.avatar = avatar
  }

  get rating() {
    return this.props.rating
  }

  set rating(rating: number) {
    this.props.rating = rating
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get username() {
    return this.props.username
  }

  set username(username: string) {
    this.props.username = username
  }

  get cpf() {
    return this.props.cpf
  }

  set cpf(cpf: string) {
    this.props.cpf = cpf
  }

  get cellphone() {
    return this.props.cellphone
  }

  set cellphone(cellphone: string) {
    this.props.cellphone = cellphone
  }

  get password() {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
  }

  get skills() {
    return this.props.skills
  }

  set skills(skills: UserSkillList) {
    this.props.skills = skills
  }

  get active() {
    return this.props.active
  }

  set active(active: boolean) {
    this.props.active = active
  }

  get createdAt() {
    return this.props.createdAt
  }
}
