import { api } from '@/services/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { isValidCPF } from '@/utils/isvalidCPF'
import { maskCPF } from '@/utils/maskCPF'
import { useRouter } from 'next/navigation'
import { toast } from '@/utils/toast'

type verifyCodeResponse = {
  requestId: string
}

export function useValidateCPF() {
  const router = useRouter()
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
    const { data } = await api.get(
      `/password/generateCode/${cpf.replace(/\D/g, '')}`,
    )
    return data
  }

  const { mutate, isLoading } = useMutation({
    mutationFn: handleRegister,
    onSuccess: (data: verifyCodeResponse, cpf) => {
      toast({
        text: 'SMS envida com sucesso para o numero cadastrado em nossa base de dados',
        title: 'Sucesso',
        type: 'SUCCESS',
      })

      const dataToVerifyCode = {
        requestId: data.requestId,
        userCpf: cpf,
      }

      const dataToBase64 = btoa(JSON.stringify(dataToVerifyCode))
      router.push(`/auth/reset-password/verify-code?data=${dataToBase64}`)
    },
    onError: () => {
      toast({
        text: 'Usuário não encontrado em nossa base de dados',
        title: 'Usuário não encontrado',
        type: 'ERROR',
      })
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
