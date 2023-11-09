'use client'
import { Opportunity } from '@/services/api/repositories/opportunity'
import { toast } from '@/utils/toast'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'

type handleRequestPayload = Omit<
  Opportunity,
  'postedBy' | 'createdAt' | 'status' | 'id'
>

export function useEditOpportunity() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const { mutate, isLoading } = useMutation({
    mutationKey: ['UPDATE_OPPORTUNITY'],
    mutationFn: Opportunity.updateOpportunity,
    onSuccess: () => {
      toast({
        title: 'Sucesso',
        text: 'Oportunidade editada com sucesso',
        type: 'SUCCESS',
      })
      router.push('/dashboard/opportunities')
    },
  })

  const { data, isLoading: isDataLoading } = useQuery(
    ['GET_OPPORTUNITY_BY_ID', id],
    () => Opportunity.getOpportunityById(id),
  )

  function handleRequest(data: handleRequestPayload) {
    mutate({ ...data, id })
  }
  return {
    handleRequest,
    isLoading,
    data,
    isDataLoading,
  }
}
