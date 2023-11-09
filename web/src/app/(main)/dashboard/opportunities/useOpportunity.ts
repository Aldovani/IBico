'use client'
import { useDrawer } from '@/contexts/useDrawer'
import { useModal } from '@/hooks/useModal'
import { Opportunity } from '@/services/api/repositories/opportunity'
import { toast } from '@/utils/toast'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

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

  const isEmpty = opportunities.length === 0

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
    Opportunity.getOpportunities,
    {
      onSuccess: (data) => {
        setOpportunities(data?.items || [])
      },
      cacheTime: 0,
      retryOnMount: true,
    },
  )

  async function handleOpenDrawer(id: string) {
    openDrawer()
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
  }
}
