import { constants } from '@/core/constants'
import { User } from '@/domain/portal/enterprise/entities/user'

export class UserPresenter {
  private static avatarBaseUrl = `${constants.BASE_URL}/public`

  static toManyHTTP(users: User[]) {
    return users.map((user) => {
      return {
        id: user.id.toString(),
        name: user.name,
        username: user.avatar
          ? `${this.avatarBaseUrl}/${user.avatar}`
          : `${this.avatarBaseUrl}/default.jpg`,
        avatar: user.avatar,
        rating: user.rating,
      }
    })
  }

  static toHTTP(user: User) {
    return {
      id: user.id.toString(),
      name: user.name,
      cpf: user.cpf,
      username: user.username,
      active: user.active,
      avatar: user.avatar
        ? `${this.avatarBaseUrl}/${user.avatar}`
        : `${this.avatarBaseUrl}/default.jpg`,
      cellphone: user.cellphone,
      createdAt: user.createdAt,
      skills: user.skills.currentItems.map((item) => item?.name),
      rating: user.rating,
    }
  }

  static toProfileHTTP(user: User) {
    return {
      id: user.id.toString(),
      name: user.name,
      username: user.username,
      active: user.active,
      avatar: user.avatar
        ? `${this.avatarBaseUrl}/${user.avatar}`
        : `${this.avatarBaseUrl}/default.jpg`,
      createdAt: user.createdAt,
      skills: user.skills.currentItems.map((item) => item?.name),
      rating: user.rating,
    }
  }
}
