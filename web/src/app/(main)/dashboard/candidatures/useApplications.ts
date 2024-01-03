import { useModal } from '@/hooks/useModal'
import {
  Candidature,
  CandidatureRepository,
} from '@/services/api/repositories/candidatures'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export function useApplications() {
  const {
    handleAnimationEndClose,
    handleClose,
    handleOpen,
    isLeave,
    isMounted,
    isOpen,
  } = useModal()

  const [candidatures, setCandidatures] = useState<Candidature[] | []>([])
  const [candidatureID, setCandidatureID] = useState<null | string>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const queryParams = useSearchParams()
  const filter = queryParams.get('filter') || ''
  const isEmpty = candidatures.length === 0

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['GET_CANDIDATURES', currentPage, filter],
    queryFn: getGetCandidatures,
    onSuccess: ({ data }) => {
      setCandidatures(data)
    },
  })

  async function getGetCandidatures() {
    let status: 'CREATED' | 'PENDING' | 'CLOSED'

    switch (filter) {
      case 'progress':
        status = 'PENDING'
        break
      case 'finished':
        status = 'CLOSED'
        break
      case '':
        status = 'CREATED'
        break
      default:
        status = 'CREATED'
    }

    return CandidatureRepository.getCandidatures({ status, page: currentPage })
  }
  const { mutate, isLoading: isUnsubscribeLoading } = useMutation({
    mutationKey: ['UNSUBSCRIBE_CANDIDATURE'],
    mutationFn: CandidatureRepository.unsubscribeCandidature,
    onSuccess: async () => {
      await refetch()
      setCandidatureID(null)
      handleClose()
    },
  })

  function handleOpenModal(id: string) {
    handleOpen()
    setCandidatureID(id)
  }

  function handleUnsubscribe() {
    if (!candidatureID) return
    mutate(candidatureID)
  }

  function handleSetPage(page: number) {
    setCurrentPage(page)
  }
  return {
    totalPages: data?.totalPages || 0,
    totalElements: data?.total || 0,
    currentPage,
    handleAnimationEndClose,
    handleClose,
    handleOpenModal,
    isLeave,
    isMounted,
    isOpen,
    candidatures,
    isLoading,
    isUnsubscribeLoading,
    handleUnsubscribe,
    isEmpty,
    handleSetPage,
  }
}
