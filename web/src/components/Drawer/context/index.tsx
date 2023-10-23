import { ReactNode, createContext, useContext } from 'react'

type DrawerProviderProps = {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
}

type DrawerContextProps = {
  isOpen: boolean

  onClose: () => void
}

export const DrawerContext = createContext({} as DrawerContextProps)

export function DrawerProvider({
  children,
  isOpen,
  onClose,
}: DrawerProviderProps) {
  return (
    <DrawerContext.Provider value={{ isOpen, onClose }}>
      {children}
    </DrawerContext.Provider>
  )
}

export function useDrawerComponent() {
  const { isOpen, onClose } = useContext(DrawerContext)
  return { isOpen, onClose }
}
