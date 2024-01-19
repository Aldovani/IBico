'use client'
import { useModal } from '@/hooks/useModal'
import {
  Opportunity,
  opportunity,
} from '@/services/api/repositories/opportunity'
import { toast } from '@/utils/toast'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
export type FilterStatus = 'CREATED' | 'PENDING' | 'CLOSED' | 'DISABLED'

type ModalContent = {
  id: string
  title: string
  amount: number
}
type handleChangeStatusOpportunity = {
  opportunityId: string
  status: FilterStatus
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

  const [opportunities, setOpportunities] = useState<Opportunity[] | []>([])

  const [modalContent, setModalContent] = useState<ModalContent | undefined>(
    undefined,
  )
  const [currentPage, setCurrentPage] = useState(1)
  const queryParams = useSearchParams()
  const filter = queryParams.get('filter') || 'CREATED'
  const isEmpty = opportunities.length === 0

  const { mutate, isLoading: isLoadingDelete } = useMutation({
    mutationFn: opportunity.deleteOpportunity,

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

  const { mutate: mutateChangeStatusOpportunity, isLoading: isFinished } =
    useMutation({
      mutationFn: opportunity.changeStatus,

      onSuccess: async () => {
        await refetch()

        toast({
          title: 'Status alterado',
          text: 'Status alterado com sucesso',
          type: 'SUCCESS',
        })
        closeModal()
      },
    })

  const {
    data,
    isLoading: isOpportunityLoading,
    refetch,
  } = useQuery(
    ['GET_OPPORTUNITIES', currentPage, filter],
    getGetOpportunities,
    {
      onSuccess: ({ data }) => {
        setOpportunities(data)
      },
    },
  )

  function handleChangeStatusOpportunity({
    opportunityId,
    status,
  }: handleChangeStatusOpportunity) {
    mutateChangeStatusOpportunity({ opportunityId, status })
  }

  async function getGetOpportunities() {
    let status: FilterStatus

    switch (filter) {
      case 'PENDING':
        status = 'PENDING'
        break
      case 'CLOSED':
        status = 'CLOSED'
        break
      case 'DISABLED':
        status = 'DISABLED'
        break
      case 'CREATED':
        status = 'CREATED'
        break
      default:
        status = 'CREATED'
    }
    return opportunity.getMeOpportunities({
      status,
      page: currentPage,
      perPage: 10,
    })
  }

  function handleDeleteOpportunity() {
    if (!modalContent) return
    mutate(modalContent?.id)
  }

  function handleOpenModal({ title, amount, id }: ModalContent) {
    openModal()
    setModalContent({ title, amount, id })
  }
  function handleChangePage(page: number) {
    setCurrentPage(page)
  }

  return {
    totalPages: data?.totalPages || 1,
    totalElements: data?.totalElements || 0,
    handleChangePage,
    currentPage,
    handleAnimationEndClose,
    handleDeleteOpportunity,
    closeModal,
    handleOpenModal,
    opportunities,
    isModalLeave,
    isModalOpen,
    isLoadingDelete,
    modalContent,
    isOpportunityLoading,
    isMounted,
    isEmpty,
    filter: filter as FilterStatus,
    handleChangeStatusOpportunity,
    isFinished,
  }
}
