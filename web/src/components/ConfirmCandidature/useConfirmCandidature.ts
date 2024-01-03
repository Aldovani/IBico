import { useAuth } from '@/hooks/useAuth'
import { useModal } from '@/hooks/useModal'
import { CandidatureRepository } from '@/services/api/repositories/candidatures'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

type UseConfirmCandidatureProps = {
  authorUsername: string
}

export function useConfirmCandidature({
  authorUsername,
}: UseConfirmCandidatureProps) {
  const {
    handleAnimationEndClose,
    handleClose,
    handleOpen,
    isLeave,
    isMounted,
    isOpen,
  } = useModal()
  const { user } = useAuth()
  const [isApply, setIsApply] = useState(false)
  const { mutate, isLoading } = useMutation({
    mutationKey: ['SUBMIT_CANDIDATURE'],
    mutationFn: CandidatureRepository.applyCandidature,
    onSuccess: () => {
      handleClose()
      setIsApply(true)
    },
  })

  const isAuthor = user?.username === authorUsername

  function handleSubmitCandidature(id: string) {
    mutate(id)
  }

  return {
    isAuthor,
    handleAnimationEndClose,
    handleClose,
    handleOpen,
    isLeave,
    isMounted,
    isOpen,
    isLoading,
    isApply,
    handleSubmitCandidature,
  }
}
