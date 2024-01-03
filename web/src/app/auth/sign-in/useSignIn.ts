import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { isValidCPF } from '@/utils/isvalidCPF'
import { useEffect, useState } from 'react'
import { maskCPF } from '@/utils/maskCPF'
import { useAuth } from '@/hooks/useAuth'
import { HTTPS_CODES } from '@/constants/http-codes'
import { toast } from '@/utils/toast'

export function useSignIn() {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const { handleSignIn, isLoading, errors: errorsSignIn } = useAuth()

  const signInSchema = z
    .object({
      cpf: z.string().max(14, 'Deve conter 11 caracteres'),
      password: z.string().min(8, 'Deve conter no mínimo 8 caracteres'),
    })
    .superRefine((val, ctx) => {
      if (!isValidCPF(val.cpf)) {
        ctx.addIssue({
          message: 'CPF invalido',
          code: 'custom',
          path: ['cpf'],
        })
      }
    })

  type SignInSchema = z.infer<typeof signInSchema>

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    setFocus,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    mode: 'all',
  })

  useEffect(() => {
    if (errorsSignIn?.response?.status === HTTPS_CODES.NOT_FOUND) {
      setError('cpf', { message: 'CPF ou senha incorreto', type: 'value' })
      setError('password', {
        message: 'Senha incorreto',
        type: 'value',
      })
      toast({
        title: 'Dados inválidos',
        text: 'CPF ous senha invalida, verifique e tente novamente',
        type: 'ERROR',
      })
      setFocus('cpf')
    }
  }, [errorsSignIn, setError, setFocus])

  function handleChangeCPF(value: string) {
    setValue('cpf', maskCPF(value))
  }
  function handleTogglePassword() {
    setIsShowPassword((current) => !current)
  }

  return {
    register,
    handleSubmit,
    errors,
    handleTogglePassword,
    isShowPassword,
    handleChangeCPF,
    isLoading,
    handleSignIn,
  }
}
