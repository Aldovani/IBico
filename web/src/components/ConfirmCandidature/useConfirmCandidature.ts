import { useModal } from '@/hooks/useModal'
import { Candidacy } from '@/services/api/repositories/candidatures'
import { useMutation } from '@tanstack/react-query'

export function useConfirmCandidature() {
  const {
    handleAnimationEndClose,
    handleClose,
    handleOpen,
    isLeave,
    isMounted,
    isOpen,
  } = useModal()

  const { mutate, isLoading } = useMutation({
    mutationKey: ['SUBMIT_CANDIDATURE'],
    mutationFn: Candidacy.applyCandidature,
  })

  function handleSubmitCandidature(id: string) {
    mutate(id)
  }

  return {
    handleAnimationEndClose,
    handleClose,
    handleOpen,
    isLeave,
    isMounted,
    isOpen,
    isLoading,
    handleSubmitCandidature,
  }
}
