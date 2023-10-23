import { useAuth } from '@/hooks/useAuth'
import { api } from '@/services/api'
import { isValidCPF } from '@/utils/isvalidCPF'
import { maskCPF } from '@/utils/maskCPF'
import { maskCellphone } from '@/utils/maskCellphone'
import { isValidCellphone } from '@/utils/isValidCellphone'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type RegisterProps = {
  name: string
  cpf: string
  cellphone: string
  password: string
  confirmPassword: string
}

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

  type signInSchema = z.infer<typeof registerSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<signInSchema>({
    resolver: zodResolver(registerSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  async function handleRegister({
    cellphone,
    confirmPassword,
    cpf,
    name,
    password,
  }: RegisterProps) {
    const { data } = await api.post('/register', {
      cellphone,
      confirmPassword,
      cpf,
      name,
      password,
    })
    return data
  }

  const { mutate, isLoading } = useMutation({
    mutationFn: handleRegister,
    onSuccess: (_, { cpf, password }) => {
      handleSignIn({ cpf, password }, '/auth/config')
    },
    onError: (error) => {
      console.log(error)
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
