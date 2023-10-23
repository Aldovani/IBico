import { api } from '@/services/api'
import { maskCellphone } from '@/utils/maskCellphone'
import { isValidCellphone } from '@/utils/isValidCellphone'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export function useValidateCellphone() {
  const cellphoneSchema = z.object({
    cellphone: z
      .string()
      .min(14, 'Deve conter no mínimo 14 números')
      .max(15)
      .refine((data) => isValidCellphone(data), 'Número informado invalido'),
  })

  type validateCellphoneSchema = z.infer<typeof cellphoneSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<validateCellphoneSchema>({
    resolver: zodResolver(cellphoneSchema),
    mode: 'onSubmit',
  })

  async function handleRegister(cellphone: string) {
    const { data } = await api.post(
      '/reset-password/validate-cellphone',
      cellphone,
    )
    return data
  }

  const { mutate, isLoading } = useMutation({
    mutationFn: handleRegister,
    onSuccess: () => {
      console.log()
    },
    onError: (error) => {
      console.log(error)
    },
  })

  function handleChangeCellphone(value: string) {
    setValue('cellphone', maskCellphone(value))
  }
  return {
    handleChangeCellphone,
    mutate,
    isLoading,
    register,
    handleSubmit,
    errors,
  }
}
