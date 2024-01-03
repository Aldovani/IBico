import { AxiosInstance } from 'axios'
import { api } from '../'

export type UserType = {
  name: string
  cpf: string
  username: string
  amount: number
  rating: number
  cellphone: string
  skills: string[]
}

type CreateUser = {
  cellphone: string
  cpf: string
  name: string
  password: string
  username: string
}

type UpdateUser = {
  cpf: string
  name: string
  username: string
  cellphone: string
  skills: string[]
  currentPassword: string | undefined
  newPassword: string | undefined
}

function UserRequest(httpProvider: AxiosInstance) {
  async function getUser() {
    const { data } = await httpProvider.get(`/users/me`)

    return data
  }
  async function getProfile(username: string) {
    const { data } = await httpProvider.get(`/users/profile/${username}`)

    return data
  }

  async function createUser(user: CreateUser) {
    const payload = {
      cellphone: user.cellphone.replace(/\D/g, ''),
      cpf: user.cpf.replace(/\D/g, ''),
      name: user.name,
      username: user.username,
      password: user.password,
    }

    await httpProvider.post('/users', payload)
  }

  async function updateUserAvatar(file: File) {
    const formData = new FormData()
    formData.append('avatar', file)
    const { data } = await httpProvider.put(`/users/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return data
  }

  async function deleteUserAvatar() {
    await httpProvider.delete('/users/avatar')
  }

  async function updateUser(user: UpdateUser) {
    const payload = {
      cpf: user.cpf.replace(/\D/g, ''),
      cellphone: user.cellphone.replace(/\D/g, ''),
      name: user.name,
      username: user.username,
      skills: user.skills,
      active: true,
      currentPassword: user.currentPassword,
      newPassword: user.newPassword,
    }

    const { data } = await httpProvider.put('/users', payload)
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
    updateUserAvatar,
    deleteUserAvatar,
    getProfile,
  }
}

export const UserRepository = UserRequest(api)
