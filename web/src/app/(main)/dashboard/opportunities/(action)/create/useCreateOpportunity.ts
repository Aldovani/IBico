import { useMutation } from '@tanstack/react-query'
import {
  Opportunity,
  opportunity,
} from '@/services/api/repositories/opportunity'
import { toast } from '@/utils/toast'
import { useRouter } from 'next/navigation'

type handleRequestPayload = Omit<
  Opportunity,
  'postBy' | 'createdAt' | 'status' | 'id'
>

export function useCreateOpportunity() {
  const router = useRouter()

  const { mutate, isLoading } = useMutation({
    mutationKey: ['CREATE_OPPORTUNITY'],
    mutationFn: opportunity.createOpportunity,
    onSuccess: () => {
      toast({
        title: 'Sucesso',
        text: 'Oportunidade criada com sucesso',
        type: 'SUCCESS',
      })
      router.push('/dashboard/opportunities')
    },
  })

  function handleRequest({
    description,
    endDateTime,
    local,
    skills,
    startDateTime,
    timeLoad,
    title,
    amount,
  }: handleRequestPayload) {
    mutate({
      description,
      endDateTime,
      local,
      skills,
      startDateTime,
      timeLoad,
      title,
      amount,
    })
  }
  return {
    handleRequest,
    isLoading,
  }
}
