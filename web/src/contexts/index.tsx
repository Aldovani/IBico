'use client'
import { queryClient } from '@/services/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { AuthContextProvider } from './authContext'

type ContextsProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: ContextsProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>{children}</AuthContextProvider>
    </QueryClientProvider>
  )
}
