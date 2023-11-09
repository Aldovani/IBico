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
type UpdateUserDTO = {
  payload: Partial<User>
  currentData: Omit<User, 'passwd'>
}

type UserRequestDTO = {
  name?: string
}

export function UserRequest(httpProvider: AxiosInstance) {
  async function getUser({ name }: UserRequestDTO) {
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

  async function updateUser({ currentData, payload }: UpdateUserDTO) {
    const userPayload = {
      ...currentData,
      ...payload,
      cpf: payload.cpf ? payload.cpf.replace(/\D/g, '') : currentData.cpf,
      telephone: payload.telephone
        ? payload.telephone.replace(/\D/g, '')
        : currentData.telephone,
    }

    const { data } = await httpProvider.put('/users', userPayload)
    return data
  }

  async function disableUser() {
    const { data } = await httpProvider.delete('/users')
    return data
  }

  return {
    disableUser,
    createUser,
    updateUser,
    getUser,
  }
}

export const User = UserRequest(clientApi)
