'use client'
import { useModal } from '@/hooks/useModal'
import { AnimationEvent, ReactNode, createContext, useContext } from 'react'

type ReviewModalContextProps = {
  handleOpen: () => void
  handleAnimationEndClose: (e: AnimationEvent<HTMLDivElement>) => void
  handleClose: () => void
  isLeave: boolean
  isOpen: boolean
  isMounted: boolean
}
type ReviewModalProviderProps = {
  children: ReactNode
}
const ReviewModalContext = createContext({} as ReviewModalContextProps)

export function ReviewModalProvider({ children }: ReviewModalProviderProps) {
  const {
    handleAnimationEndClose,
    handleClose,
    handleOpen,
    isLeave,
    isOpen,
    isMounted,
  } = useModal()

  return (
    <ReviewModalContext.Provider
      value={{
        handleOpen,
        handleAnimationEndClose,
        handleClose,
        isLeave,
        isOpen,
        isMounted,
      }}
    >
      {children}
    </ReviewModalContext.Provider>
  )
}

export function useReviewModal() {
  const data = useContext(ReviewModalContext)
  return data
}
