'use client'
import { queryClient } from '@/services/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { AuthContextProvider } from './authContext'
import { ReviewModalProvider } from './reviewModalContext'

type ContextsProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: ContextsProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReviewModalProvider>
        <AuthContextProvider>{children}</AuthContextProvider>
      </ReviewModalProvider>
    </QueryClientProvider>
  )
}
