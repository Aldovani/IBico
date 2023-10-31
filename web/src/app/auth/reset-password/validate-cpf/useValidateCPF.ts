import { api } from '@/services/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { isValidCPF } from '@/utils/isvalidCPF'
import { maskCPF } from '@/utils/maskCPF'

export function useValidateCPF() {
  const CPFSchema = z
    .object({
      cpf: z.string().max(14).min(14, 'Deve conter no mínimo 14 números'),
    })
    .superRefine((val, ctx) => {
      if (!isValidCPF(val.cpf)) {
        ctx.addIssue({ message: 'CPF invalido', code: 'custom', path: ['cpf'] })
      }
    })

  type validateCPFSchema = z.infer<typeof CPFSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<validateCPFSchema>({
    resolver: zodResolver(CPFSchema),
    mode: 'onSubmit',
  })

  async function handleRegister(cpf: string) {
    const { data } = await api.get(`/password/generateCode/${cpf}`)
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

  function handleChangeCPF(value: string) {
    setValue('cpf', maskCPF(value))
  }
  return {
    handleChangeCPF,
    mutate,
    isLoading,
    register,
    handleSubmit,
    errors,
  }
}
