import { api } from '@/services/api'
import { toast } from '@/utils/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type ResetPasswordInfo = {
  requestId: string
}

export function useResetPassword() {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
  const router = useRouter()
  const [resetPasswordInfo, setResetPasswordInfo] = useState<
    ResetPasswordInfo | undefined
  >(undefined)
  const queyParams = useSearchParams()

  useEffect(() => {
    if (!queyParams.get('data')) return

    const data = JSON.parse(atob(queyParams.get('data') || '{}'))
    if (data?.requestId) {
      setResetPasswordInfo(data)
    }
  }, [queyParams])

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

  const { mutate, isLoading } = useMutation({
    mutationFn: handleRequestChangePassword,
    onSuccess: () => {
      toast({
        title: 'Senha alterada com sucesso',
        text: 'sua senha foi redefinida com sucesso ',
        type: 'SUCCESS',
      })
      router.push('/auth/sign-in')
    },
    onError: (error) => {
      console.log(error)
    },
  })

  async function handleRequestChangePassword(password: string) {
    const { data } = await api.put('/users/reset-password/change-password', {
      requestId: resetPasswordInfo?.requestId,
      password,
    })
    return data
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
    mutate,
    isLoading,
  }
}
