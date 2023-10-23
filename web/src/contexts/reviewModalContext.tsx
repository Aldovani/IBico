import { useModal } from '@/hooks/useModal'
import { AnimationEvent, ReactNode, createContext, useContext } from 'react'

type ReviewModalContextProps = {
  handleOpen: () => void
  handleAnimationEndClose: (e: AnimationEvent<HTMLDivElement>) => void
  handleClose: () => void
  isLeave: boolean
  isOpen: boolean
}
type ReviewModalProviderProps = {
  children: ReactNode
}
const ReviewModalContext = createContext({} as ReviewModalContextProps)

export function ReviewModalProvider({ children }: ReviewModalProviderProps) {
  const {
    handleAnimationEndClose,
    handleCloseModal,
    handleOpenModal,
    isLeave,
    isOpen,
  } = useModal()

  return (
    <ReviewModalContext.Provider
      value={{
        handleOpen: handleOpenModal,
        handleAnimationEndClose,
        handleClose: handleCloseModal,
        isLeave,
        isOpen,
      }}
    >
      {children}
    </ReviewModalContext.Provider>
  )
}

export function useReviewModal() {
  const { handleOpen, handleAnimationEndClose, handleClose, isLeave, isOpen } =
    useContext(ReviewModalContext)
  return { handleOpen, handleAnimationEndClose, handleClose, isLeave, isOpen }
}
