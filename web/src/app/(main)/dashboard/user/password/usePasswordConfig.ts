import { User as UserType } from '@/contexts/authContext'
import { useAuth } from '@/hooks/useAuth'
import { User } from '@/services/api/repositories/user'
import { toast } from '@/utils/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export function usePasswordConfig() {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const { user } = useAuth()
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)

  const changePasswordSchema = z
    .object({
      password: z
        .string()
        .min(8, 'Deve conter no mínimo 08 números')
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?.&])[A-Za-z\d@$!%*?.&]{8,}$/,
          'Senha deve conter letra maiúscula e minuscula , numero e um carácter especial ',
        ),
      confirmPassword: z.string().min(8, 'Deve conter no mínimo 08 números'),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (password !== confirmPassword) {
        ctx.addIssue({
          message: 'Senhas diferentes',
          code: 'custom',
          path: ['confirmPassword'],
        })
      }
    })

  type ChangePasswordSchema = z.infer<typeof changePasswordSchema>

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onSubmit',
  })

  const { mutate, isLoading } = useMutation({
    mutationKey: ['UPDATE_PASSWORD'],
    mutationFn: User.updateUser,
    onSuccess: () => {
      toast({
        text: 'Senha alterada com sucesso',
        title: 'Alteração realizada com sucesso',
        type: 'SUCCESS',
      })
      reset()
    },
  })
  async function handleChangePassword(password: string) {
    mutate({
      payload: { passwd: password },
      currentData: user as UserType,
    })
  }

  function handleTogglePassword() {
    setIsShowPassword((prev) => !prev)
  }
  function handleToggleConfirmPassword() {
    setIsShowConfirmPassword((prev) => !prev)
  }

  return {
    handleTogglePassword,
    handleToggleConfirmPassword,
    isShowPassword,
    isShowConfirmPassword,
    register,
    errors,
    handleSubmit,
    handleChangePassword,
    isLoading,
  }
}
