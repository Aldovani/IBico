'use client'
import { useDrawer } from '@/contexts/useDrawer'
import { useModal } from '@/hooks/useModal'
import { Candidate, Opportunity } from '@/services/api/repositories/opportunity'
import { toast } from '@/utils/toast'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

type ModalContent = {
  id: string
  title: string
  value: number
}

export function useOpportunity() {
  const {
    handleAnimationEndClose,
    handleClose: closeModal,
    handleOpen: openModal,
    isLeave: isModalLeave,
    isOpen: isModalOpen,
    isMounted,
  } = useModal()

  const {
    isOpen: isDrawerOpen,
    handleClose: closeDrawer,
    handleOpen: openDrawer,
  } = useDrawer()

  const [opportunities, setOpportunities] = useState<Opportunity[] | []>([])

  const [modalContent, setModalContent] = useState<ModalContent | undefined>(
    undefined,
  )
  const [opportunityId, setOpportunityId] = useState('')
  const [candidates, setCandidates] = useState<Candidate[]>([])

  const isEmpty = opportunities.length === 0
  const isCandidateListEmpty = candidates.length === 0

  const { mutate, isLoading: isLoadingDelete } = useMutation({
    mutationFn: Opportunity.deleteOpportunity,

    onSuccess: async () => {
      await refetch()

      toast({
        title: 'Oportunidade deletada',
        text: 'Oportunidade deletada com sucesso',
        type: 'SUCCESS',
      })
      closeModal()
    },
  })

  const { isLoading: isOpportunityLoading, refetch } = useQuery(
    ['GET_OPPORTUNITIES'],
    Opportunity.getMeOpportunities,
    {
      onSuccess: (data) => {
        setOpportunities(data?.items || [])
      },
      cacheTime: 0,
      retryOnMount: true,
    },
  )

  const { refetch: getCandidates, isLoading: isCandidatesLoading } = useQuery({
    queryKey: ['GET_CANDIDATES', opportunityId],
    queryFn: () => Opportunity.getCandidates(opportunityId),
    onSuccess: (data) => {
      setCandidates(data.items)
    },
    refetchOnMount: false,
    enabled: false,
  })

  const { isLoading: isSelectCandidateLoading, mutate: handleSelectCandidate } =
    useMutation({
      mutationKey: ['SELECT_CANDIDATE'],
      mutationFn: Opportunity.selectCandidate,
      onSuccess: async () => {
        toast({
          title: 'Sucesso',
          text: 'Candidato escolhido com sucesso',
          type: 'SUCCESS',
        })
        await refetch()
        closeDrawer()
      },
    })

  useEffect(() => {
    if (!opportunityId) return
    getCandidates()
  }, [getCandidates, opportunityId])

  async function handleOpenDrawer(id: string) {
    openDrawer()
    setOpportunityId(id)
  }

  function handleDeleteOpportunity() {
    if (!modalContent) return
    mutate(modalContent?.id)
  }

  function handleOpenModal({ title, value, id }: ModalContent) {
    openModal()
    setModalContent({ title, value, id })
  }

  return {
    isCandidateListEmpty,
    handleAnimationEndClose,
    handleDeleteOpportunity,
    handleOpenDrawer,
    closeModal,
    closeDrawer,
    handleOpenModal,
    opportunities,
    isModalLeave,
    isModalOpen,
    isDrawerOpen,
    isLoadingDelete,
    modalContent,
    isOpportunityLoading,
    isMounted,
    isEmpty,
    candidates,
    isCandidatesLoading,
    isSelectCandidateLoading,
    handleSelectCandidate,
  }
}
