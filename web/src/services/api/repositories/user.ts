import { AxiosInstance, AxiosResponse } from 'axios'
import { clientApi } from '../providers/clientSide'

type CreateUser = {
  cellphone: string
  cpf: string
  name: string
  password: string
  username: string
}

type UserCreated = {
  name: string
  username: string
  imgURL: string
}

type Skill = {
  name: string
}

type User = {
  name: string
  passwd: string
  username: string
  telephone: string
  cpf: string
  imgURL: string
  skills: Skill[]
  active: boolean
}
type UpdateUserDTO = Partial<User>

export function UserRequest(httpProvider: AxiosInstance) {
  async function getUser(name?: string) {
    const { data } = await httpProvider.get(`/users${name ? `${name}` : ''}`)
    return data
  }

  async function createUser({
    cellphone,
    cpf,
    name,
    password,
    username,
  }: CreateUser) {
    const userPayload = {
      telephone: cellphone.replace(/\D/g, ''),
      cpf: cpf.replace(/\D/g, ''),
      name,
      username,
      imgURL: '',
      passwd: password,
      skills: [],
    }

    const { data } = await httpProvider.post<
      unknown,
      AxiosResponse<UserCreated>
    >('/users', userPayload)

    return data
  }

  async function updateUser({
    cpf,
    imgURL,
    name,
    passwd,
    skills,
    telephone,
    username,
    active,
  }: UpdateUserDTO) {
    const { data: response } = await httpProvider.get(`/users`)

    const user = response.items[0]
    const userPayload = {
      cpf: cpf?.replace(/\D/g, '') || user.cpf,
      telephone: telephone?.replace(/\D/g, '') || user.telephone,
      imgURL: imgURL || user.imgURL,
      name: name || user.name,
      passwd,
      skills: skills || user.skills,
      username: username || user.username,
      active: active || user?.active,
    }

    const { data } = await httpProvider.put('/users', userPayload)
    return data
  }

  async function deleteUser() {
    const { data } = await httpProvider.delete('/users')
    return data
  }

  return {
    deleteUser,
    createUser,
    updateUser,
    getUser,
  }
}

export const User = UserRequest(clientApi)
