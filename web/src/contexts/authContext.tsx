'use client'

import { HTTPS_CODES } from '@/constants/http-codes'
import { UserRepository } from '@/services/api/repositories/user'
import { toast } from '@/utils/toast'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { ReactNode, createContext, useState, useTransition } from 'react'
import { api } from '@/services/api'

type RequestSignInProps = {
  cpf: string
  password: string
}

type RequestSignInResponse = {
  access_token: string
}

export type User = {
  name: string
  active: true
  cpf: string
  createdAt: string
  avatar: string
  skills: string[]
  cellphone: string
  username: string
}

type authContextProviderProps = {
  children: ReactNode
  user: User | null
}

type authContext = {
  handleSignIn: (data: RequestSignInProps, pathTo?: string) => void
  handleSignOut: () => void
  isLoading: boolean
  user: User | null
  isAuthenticated: boolean
  errors: AxiosError | undefined
  getUser: () => Promise<void>
}

export const AuthContext = createContext({} as authContext)

export function AuthContextProvider({
  children,
  user: userProp,
}: authContextProviderProps) {
  const [user, setUser] = useState<User | null>(userProp || null)
  const [errors, setError] = useState<AxiosError | undefined>(undefined)
  const [, startTransition] = useTransition()
  const router = useRouter()

  const isAuthenticated = !!user

  const { refetch } = useQuery(['GET_USER'], UserRepository.getUser, {
    onSuccess: (data) => {
      setUser(data.data)
    },
    enabled: false,
    retry: 0,
    initialData: userProp,
  })

  const { mutate, isLoading } = useMutation<
    RequestSignInResponse,
    AxiosError,
    { cpf: string; password: string; pathTo: string }
  >({
    mutationFn: handleRequest,

    onSuccess: async (data: { access_token: string }, { pathTo }) => {
      const dataUser = await UserRepository.getUser()
      startTransition(() => {
        setUser(dataUser.data)
        setError(undefined)
        router.push(pathTo)
      })
    },
    onError: (error) => {
      if (error.response?.status === HTTPS_CODES.INTERNAL_SERVER_ERROR) {
        toast({
          title: 'Error',
          text: 'Ops! Encontramos um problema interno no servidor. Estamos trabalhando para corrigi-lo. Desculpe pelo inconveniente.',
          type: 'ERROR',
        })
        return
      }

      setError(error)
    },
  })

  async function handleSignIn(
    { cpf, password }: RequestSignInProps,
    pathTo = '/opportunities',
  ) {
    mutate({ cpf, password, pathTo })
  }

  async function handleSignOut() {
    await api.delete('/sessions')
    setUser(null)
    router.push('/')
  }

  async function handleRequest({ cpf, password }: RequestSignInProps) {
    const { data } = await api.post('/sessions', {
      cpf: cpf.replace(/\D/g, ''),
      password,
    })
    return data
  }

  async function getUser() {
    await refetch()
  }

  return (
    <AuthContext.Provider
      value={{
        handleSignIn,
        isLoading,
        isAuthenticated,
        user,
        handleSignOut,
        errors,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
