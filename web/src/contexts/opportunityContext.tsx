'use client'
import { Drawer } from '@/components/Drawer'
import { Modal } from '@/components/Modal'
import { useModal } from '@/hooks/useModal'
import {
  AnimationEvent,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react'
import { useDrawer } from './useDrawer'
import { useMutation } from '@tanstack/react-query'
import { Opportunity } from '@/services/api/repositories/opportunity'
import { toast } from '@/utils/toast'

type ModalContent = {
  id: string
  title: string
  value: number
}

type OpportunityContextProps = {
  handleOpenModal: (data: ModalContent) => void
  handleOpenDrawer: (id: string) => void
  handleCloseDrawer: () => void
  handleCloseModal: () => void
  handleDeleteOpportunity: () => void
  handleAnimationEndCloseModal: (e: AnimationEvent<HTMLDivElement>) => void
  isDrawerOpen: boolean
  isModalLeave: boolean
  isModalOpen: boolean
  modalContent: ModalContent | undefined
}
type OpportunityProviderProps = {
  children: ReactNode
}

const OpportunityContext = createContext({} as OpportunityContextProps)

export function OpportunityProvider({ children }: OpportunityProviderProps) {
  const {
    handleAnimationEndClose,
    handleCloseModal: closeModal,
    handleOpenModal: openModal,
    isLeave: isModalLeave,
    isOpen: isModalOpen,
  } = useModal()

  const {
    isOpen: isDrawerOpen,
    handleClose: closeDrawer,
    handleOpen: openDrawer,
  } = useDrawer()

  const [modalContent, setModalContent] = useState<ModalContent | undefined>(
    undefined,
  )
  const { mutate, isLoading: isLoadingDelete } = useMutation({
    mutationFn: Opportunity.deleteOpportunity,

    onSuccess: () => {
      toast({
        title: 'Oportunidade deletada',
        text: 'Oportunidade deletada com sucesso',
        type: 'SUCCESS',
      })
      closeModal()
    },
  })

  async function handleOpenModal({ title, value, id }: ModalContent) {
    openModal()
    setModalContent({ title, value, id })
  }
  async function handleOpenDrawer(id: string) {
    openDrawer()
  }

  function handleDeleteOpportunity() {
    if (!modalContent) return
    mutate(modalContent?.id)
  }

  return (
    <OpportunityContext.Provider
      value={{
        handleOpenDrawer,
        handleOpenModal,
        isDrawerOpen,
        isModalOpen,
        isModalLeave,
        handleCloseDrawer: closeDrawer,
        handleAnimationEndCloseModal: handleAnimationEndClose,
        handleCloseModal: closeModal,
        handleDeleteOpportunity,
        modalContent,
      }}
    >
      {children}
    </OpportunityContext.Provider>
  )
}

export function useOpportunity() {
  const data = useContext(OpportunityContext)
  return {
    ...data,
  }
}
