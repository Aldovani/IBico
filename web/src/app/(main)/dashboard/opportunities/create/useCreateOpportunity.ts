import { useMutation } from '@tanstack/react-query'
import { Opportunity } from '@/services/api/repositories/opportunity'
import { toast } from '@/utils/toast'
import { useRouter } from 'next/navigation'

type handleRequestPayload = Omit<
  Opportunity,
  'postedBy' | 'createdAt' | 'status' | 'id'
>

export function useCreateOpportunity() {
  const router = useRouter()

  const { mutate, isLoading } = useMutation({
    mutationKey: ['CREATE_OPPORTUNITY'],
    mutationFn: Opportunity.createOpportunity,
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
    necessarySkills,
    startDateTime,
    timeLoad,
    title,
    value,
  }: handleRequestPayload) {
    mutate({
      description,
      endDateTime,
      local,
      necessarySkills,
      startDateTime,
      timeLoad,
      title,
      value,
    })
  }
  return {
    handleRequest,
    isLoading,
  }
}
