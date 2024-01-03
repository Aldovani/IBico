import { useAuth } from '@/hooks/useAuth'
import { UserRepository } from '@/services/api/repositories/user'
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

  const changePasswordSchema = z.object({
    currentPassword: z.string().min(8, 'Deve conter no mínimo 08 números'),
    newPassword: z
      .string()
      .min(8, 'Deve conter no mínimo 08 números')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?.&])[A-Za-z\d@$!%*?.&]{8,}$/,
        'Senha deve conter letra maiúscula e minuscula , numero e um carácter especial ',
      ),
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
    mutationFn: UserRepository.updateUser,
    onSuccess: () => {
      toast({
        text: 'Senha alterada com sucesso',
        title: 'Alteração realizada com sucesso',
        type: 'SUCCESS',
      })
      reset()
    },
  })
  async function handleChangePassword(
    currentPassword: string,
    newPassword: string,
  ) {
    if (!user) return
    mutate({
      cellphone: user.cellphone,
      cpf: user.cpf,
      currentPassword,
      name: user.name,
      newPassword,
      skills: user.skills,
      username: user.username,
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
