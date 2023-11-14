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
import { ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export function useUserConfig() {
  const { user, getUser } = useAuth()

  const {
    handleAnimationEndClose,
    handleClose,
    handleOpen,
    isLeave,
    isOpen,
    isMounted,
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
    onSuccess: async () => {
      getUser()
      toast({
        title: 'Sucesso',
        text: 'alteração de perfil realizada com sucesso',
        type: 'SUCCESS',
      })
    },
  })

  const { mutate: disableUserMutate, isLoading: isLoadingUserDisable } =
    useMutation({
      mutationKey: ['DELETE_USER'],
      mutationFn: User.disableUser,
      onSuccess: async () => {
        await getUser()
        handleClose()
      },
    })

  const { mutate: mutateUpdateAvatar } = useMutation({
    mutationKey: ['UPDATE_USER_AVATAR'],
    mutationFn: User.updateUserAvatar,
    onSuccess: async () => {
      await getUser()
      handleClose()
    },
  })

  const { mutate: mutateDeleteAvatar, isLoading: isLoadingDeleteUserAvatar } =
    useMutation({
      mutationKey: ['DELETE_USER_AVATAR'],
      mutationFn: User.deleteUserAvatar,
      onSuccess: async () => {
        await getUser()
        handleClose()
      },
    })

  function handleDeleteAvatar() {
    mutateDeleteAvatar(user!.username)
  }

  function handleUpdateAvatar(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return

    const file = event.target.files[0]

    mutateUpdateAvatar({
      username: user!.username,
      file,
    })
  }

  function handleDisableAccount() {
    disableUserMutate()
  }

  function handleChangeCPF(value: string) {
    setValue('cpf', maskCPF(value))
  }
  function handleChangeCellphone(value: string) {
    setValue('cellphone', maskCellphone(value))
  }

  return {
    user,
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
    handleClose,
    handleOpen,
    isLeave,
    isOpen,
    isMounted,
    handleDeleteAvatar,
    isLoadingDeleteUserAvatar,
    handleUpdateAvatar,
  }
}
