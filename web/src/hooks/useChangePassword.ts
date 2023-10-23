import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export function useChangePassword() {
  const [isShowPassword, setIsShowPassword] = useState(false)
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
    formState: { errors },
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onSubmit',
  })

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
  }
}
