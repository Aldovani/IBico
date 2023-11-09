import { useAuth } from '@/hooks/useAuth'
import { isValidCPF } from '@/utils/isvalidCPF'
import { maskCPF } from '@/utils/maskCPF'
import { maskCellphone } from '@/utils/maskCellphone'
import { isValidCellphone } from '@/utils/isValidCellphone'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AxiosError } from 'axios'
import { HTTPS_CODES } from '@/constants/http-codes'
import { toast } from '@/utils/toast'
import { User } from '@/services/api/repositories/user'

export function useRegister() {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
  const { handleSignIn } = useAuth()

  const registerSchema = z
    .object({
      cpf: z.string().max(14).min(14, 'Deve conter no mínimo 14 números'),
      name: z.string().min(8, 'Deve conter no mínimo 8 caracteres'),
      cellphone: z
        .string()
        .max(15)
        .min(14, 'Deve conter no mínimo 14 caracteres')
        .refine(
          (data) => isValidCellphone(data),
          'Número de telefone invalido',
        ),
      username: z.string().min(4, 'Deve conter no mínimo 4 caracteres'),
      password: z
        .string()
        .min(8, 'Deve conter no minion 8 caracteres')
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?.&])[A-Za-z\d@$!%*?.&]{8,}$/,
          'Senha deve conter letra maiúscula e minuscula , numero e um carácter especial ',
        ),
      confirmPassword: z.string().min(8, 'Deve conter no minion 8 caracteres'),
    })
    .superRefine((val, ctx) => {
      if (!isValidCPF(val.cpf)) {
        ctx.addIssue({ message: 'CPF invalido', code: 'custom', path: ['cpf'] })
      }

      if (val.password !== val.confirmPassword) {
        ctx.addIssue({
          message: 'Senhas diferentes',
          code: 'custom',
          path: ['confirmPassword'],
        })
      }
    })

  type registerSchema = z.infer<typeof registerSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<registerSchema>({
    resolver: zodResolver(registerSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: User.createUser,
    onSuccess: (_, { cpf, password }) => {
      handleSignIn({ cpf, password }, '/auth/config')
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === HTTPS_CODES.INTERNAL_SERVER_ERROR) {
        toast({
          text: 'Aconteceu um erro em nossos servidores, tente novamente mais tarde',
          title: 'Erro no servidor',
          type: 'ERROR',
        })
      }
    },
  })

  function handleToggleIconPassword() {
    setIsShowPassword((prev) => !prev)
  }
  function handleToggleIconConfirmPassword() {
    setIsShowConfirmPassword((prev) => !prev)
  }

  function handleChangeCPF(value: string) {
    setValue('cpf', maskCPF(value))
  }
  function handleChangeCellphone(value: string) {
    setValue('cellphone', maskCellphone(value))
  }

  return {
    register,
    handleSubmit,
    errors,
    handleToggleIconPassword,
    handleToggleIconConfirmPassword,
    isShowConfirmPassword,
    isShowPassword,
    handleRegister: mutate,
    isLoading,
    handleChangeCPF,
    handleChangeCellphone,
  }
}
