import { useAuth } from '@/hooks/useAuth'
import { useModal } from '@/hooks/useModal'
import { User } from '@/services/api/repositories/user'
import { isValidCellphone } from '@/utils/isValidCellphone'
import { isValidCPF } from '@/utils/isvalidCPF'
import { maskCPF } from '@/utils/maskCPF'
import { maskCellphone } from '@/utils/maskCellphone'
import { toast } from '@/utils/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export function useUserConfig() {
  const { user } = useAuth()
  const {
    handleAnimationEndClose,
    handleCloseModal,
    handleOpenModal,
    isLeave,
    isOpen,
  } = useModal()
  const userSchema = z
    .object({
      cpf: z.string().max(14).min(14, 'Deve conter no mínimo 14 números'),
      name: z.string().min(8, 'Deve conter no mínimo 8 caracteres'),
      username: z.string().min(8, 'Deve conter no mínimo 8 caracteres'),
      cellphone: z
        .string()
        .max(15)
        .min(14, 'Deve conter no mínimo 14 caracteres')
        .refine(
          (data) => isValidCellphone(data),
          'Número de telefone invalido',
        ),
    })
    .superRefine((val, ctx) => {
      if (!isValidCPF(val.cpf)) {
        ctx.addIssue({ message: 'CPF invalido', code: 'custom', path: ['cpf'] })
      }
    })

  type UserSchema = z.infer<typeof userSchema>

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      cellphone: maskCellphone(user?.telephone || ''),
      cpf: maskCPF(user?.cpf || ''),
      name: user?.name,
      username: user?.username,
    },
  })

  const { isLoading, mutate } = useMutation({
    mutationKey: ['UPDATE_USER'],
    mutationFn: User.updateUser,
    onSuccess: () => {
      toast({
        title: 'Sucesso',
        text: 'alteração de perfil realizada com sucesso',
        type: 'SUCCESS',
      })
    },
  })

  const { mutateAsync: disableUserMutate, isLoading: isLoadingUserDisable } =
    useMutation({
      mutationKey: ['DELETE_USER'],
      mutationFn: User.deleteUser,
      onSuccess: () => {
        // handleCloseModal()
      },
    })

  async function handleDisableAccount() {
    await disableUserMutate()
  }

  function handleChangeCPF(value: string) {
    setValue('cpf', maskCPF(value))
  }
  function handleChangeCellphone(value: string) {
    setValue('cellphone', maskCellphone(value))
  }

  return {
    register,
    mutate,
    isLoading,
    isValid,
    handleSubmit,
    errors,
    handleChangeCellphone,
    handleChangeCPF,
    handleDisableAccount,
    isLoadingUserDisable,
    handleAnimationEndClose,
    handleCloseModal,
    handleOpenModal,
    isLeave,
    isOpen,
  }
}
