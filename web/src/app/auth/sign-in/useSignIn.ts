import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { isValidCPF } from '@/utils/isvalidCPF'
import { useState } from 'react'
import { maskCPF } from '@/utils/maskCPF'

export function useSignIn() {
  const [isShowPassword, setIsShowPassword] = useState(false)

  const signInSchema = z
    .object({
      cpf: z.string().max(14, 'Deve conter 11 caracteres'),
      password: z.string().min(8, 'Deve conter no mínimo 8 caracteres'),
    })
    .superRefine((val, ctx) => {
      if (!isValidCPF(val.cpf)) {
        ctx.addIssue({ message: 'CPF invalido', code: 'custom', path: ['cpf'] })
      }
    })

  type signInSchema = z.infer<typeof signInSchema>

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<signInSchema>({
    resolver: zodResolver(signInSchema),
    mode: 'onSubmit',
  })

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
  }
}
