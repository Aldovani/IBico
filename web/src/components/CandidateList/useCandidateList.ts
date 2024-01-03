import { CandidatureRepository } from '@/services/api/repositories/candidatures'
import { opportunity } from '@/services/api/repositories/opportunity'
import { toast } from '@/utils/toast'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type UseCandidateListProps = {
  opportunityId: string
}

export function useCandidateList({ opportunityId }: UseCandidateListProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const router = useRouter()
  const { data, isLoading } = useQuery({
    queryKey: ['GET_CANDIDATES', currentPage],
    queryFn: handleGetCandidates,
  })

  const { mutate, isLoading: isSelectCandidateLoading } = useMutation({
    mutationKey: ['SELECT_CANDIDATE'],
    mutationFn: opportunity.selectCandidate,
    onSuccess: () => {
      toast({
        title: 'Candidato selecionado',
        text: 'Candidato selecionado com sucesso, status da oportunidade alterado para em progresso  ',
        type: 'SUCCESS',
      })
      router.push('/dashboard/opportunities')
    },
  })

  async function handleGetCandidates() {
    const data = await CandidatureRepository.fetchCandidates({
      opportunityId,
      page: currentPage,
    })
    return data
  }

  function handleChangePage(page: number) {
    setCurrentPage(page)
  }
  return {
    isLoading,
    candidates: data?.data || [],
    totalCandidates: data?.totalElements || 0,
    currentPage,
    handleChangePage,
    totalPages: data?.totalPages || 0,
    isEmpty: data?.data?.length === 0,
    handleSelectCandidate: mutate,
    isSelectCandidateLoading,
  }
}
