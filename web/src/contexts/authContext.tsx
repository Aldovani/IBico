import { HTTPS_CODES } from '@/constants/http-codes'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { api } from '@/services/api'
import { toast } from '@/utils/toast'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { ReactNode, createContext, useState } from 'react'

type authContextProviderProps = {
  children: ReactNode
}

type RequestSignInProps = {
  cpf: string
  password: string
}

type RequestSignInResponse = {
  access_token: string
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
  errors: AxiosError | undefined
}

export const AuthContext = createContext({} as authContext)

export function AuthContextProvider({ children }: authContextProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const { save, remove } = useLocalStorage()
  const router = useRouter()
  const [errors, setError] = useState<AxiosError | undefined>(undefined)

  const isAuthenticated = !!user

  async function handleRequest({ cpf, password }: RequestSignInProps) {
    const signPayload = `${cpf.replace(/\D/g, '')}:${password}`
    const signEncoded = btoa(signPayload)

    const { data } = await api.post('/oauth/token', null, {
      headers: {
        Authorization: `Basic ${signEncoded}`,
      },
    })
    console.log(data)
    return data
  }

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
        onSuccess: ({ access_token: accessToken }) => {
          save('token', accessToken)
          router.push(pathTo)
        },
        onError: (error) => {
          if(error.response?.status=== HTTPS_CODES.INTERNAL_SERVER_ERROR){
            toast({text:"",title:"Erro no servidor",type:"ERROR"})
            return
          }
          
          setError(error)
        },
      },
    )
  }

  function handleSignOut() {
    remove('token')
    router.push('/')
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
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
