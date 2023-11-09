'use client'

import { HTTPS_CODES } from '@/constants/http-codes'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { User } from '@/services/api/repositories/user'
import { toast } from '@/utils/toast'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { ReactNode, createContext, useState } from 'react'
import { useCookies } from 'next-client-cookies'
import { clientApi } from '@/services/api'

type authContextProviderProps = {
  children: ReactNode
  user: { items: User[] } | null
}

type RequestSignInProps = {
  cpf: string
  password: string
}

type RequestSignInResponse = {
  access_token: string
}
type skill = {
  name: string
  id: number
}

export type User = {
  name: string
  active: true
  cpf: string
  dateOfCreation: string
  imgURL: string
  skills: skill[]
  telephone: string
  username: string
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
  const [user, setUser] = useState<User | null>(userProp?.items[0] || null)
  const [errors, setError] = useState<AxiosError | undefined>(undefined)
  const { save, remove } = useLocalStorage()
  const router = useRouter()
  const cookies = useCookies()

  const isAuthenticated = !!user

  const { refetch } = useQuery(['GET_USER'], () => User.getUser({}), {
    onSuccess: (data) => {
      setUser(data.items[0])
    },
    initialData: userProp,
  })

  const { mutate, isLoading } = useMutation<
    RequestSignInResponse,
    AxiosError,
    { cpf: string; password: string },
    unknown
  >({
    mutationFn: handleRequest,
  })

  function handleSignIn(
    { cpf, password }: RequestSignInProps,
    pathTo = '/opportunities',
  ) {
    mutate(
      { cpf, password },
      {
        onSuccess: async ({ access_token: accessToken }) => {
          save('token', accessToken)
          cookies.set('token', accessToken)

          const data = await User.getUser({})

          setUser(data.items[0])
          router.push(pathTo)
        },
        onError: (error) => {
          if (error.response?.status === HTTPS_CODES.INTERNAL_SERVER_ERROR) {
            toast({ text: '', title: 'Erro no servidor', type: 'ERROR' })
            return
          }

          setError(error)
        },
      },
    )
  }

  function handleSignOut() {
    remove('token')
    setUser(null)
    cookies.set('token', '')

    router.push('/')
  }

  async function handleRequest({ cpf, password }: RequestSignInProps) {
    const signPayload = `${cpf.replace(/\D/g, '')}:${password}`

    const signEncoded = btoa(signPayload)

    const { data } = await clientApi.post('/oauth/token', null, {
      headers: {
        Authorization: `Basic ${signEncoded}`,
      },
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
