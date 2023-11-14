import { useModal } from '@/hooks/useModal'
import { Candidacy } from '@/services/api/repositories/candidatures'
import { useMutation, useQuery } from '@tanstack/react-query'
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

  const [candidatures, setCandidatures] = useState<Candidacy[] | []>([])
  const [candidatureID, setCandidatureID] = useState<null | string>(null)

  const isEmpty = candidatures.length === 0
  const { isLoading, refetch } = useQuery({
    queryKey: ['GET_CANDIDATURES'],
    queryFn: Candidacy.getCandidatures,
    onSuccess: (data) => {
      setCandidatures(data.items)
    },
  })

  const { mutate, isLoading: isUnsubscribeLoading } = useMutation({
    mutationKey: ['UNSUBSCRIBE_CANDIDATURE'],
    mutationFn: Candidacy.unsubscribeCandidature,
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

  return {
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
  }
}
