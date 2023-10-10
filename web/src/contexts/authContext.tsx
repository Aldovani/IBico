import { useLocalStorage } from '@/hooks/useLocalStorage'
import { api } from '@/services/api'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { ReactNode, createContext, useState } from 'react'

type authContextProviderProps = {
  children: ReactNode
}

type RequestSignInProps = {
  cpf: string
  password: string
}

type User = {
  name: string
  avatar: string
  token: string
}

type authContext = {
  handleSignIn: (data: RequestSignInProps, pathTo?: string) => void
  handleSignOut: () => void
  isLoading: boolean
  user: User | null
  isAuthenticated: boolean
}

export const AuthContext = createContext({} as authContext)

export function AuthContextProvider({ children }: authContextProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const { save, remove } = useLocalStorage()
  const router = useRouter()

  const isAuthenticated = !!user

  async function handleRequest({ cpf, password }: RequestSignInProps) {
    const { data } = await api.post('/sign-in', { cpf, password })

    return data
  }

  const { mutate, isLoading } = useMutation<
    User,
    unknown,
    { cpf: string; password: string },
    unknown
  >({
    mutationFn: handleRequest,
  })

  function handleSignIn(
    { cpf, password }: RequestSignInProps,
    pathTo = '/vagas',
  ) {
    mutate(
      { cpf, password },
      {
        onSuccess: (data) => {
          setUser(data)
          save('token', data.token)
          router.push(pathTo)
        },
        onError: (error) => {
          alert('error')
          console.log(error)
        },
      },
    )
  }

  function handleSignOut() {
    remove('token')
    router.push('/auth/sign-in')
  }

  return (
    <AuthContext.Provider
      value={{
        handleSignIn,
        isLoading,
        isAuthenticated,
        user,
        handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
