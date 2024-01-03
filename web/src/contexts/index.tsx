'use client'
import { queryClient } from '@/services/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { AuthContextProvider, User } from './authContext'
import { ReviewModalProvider } from './reviewModalContext'

type ContextsProvidersProps = {
  children: ReactNode
  user: { data: User } | null
}

export function AppProviders({ children, user }: ContextsProvidersProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider user={user?.data || null}>
          <ReviewModalProvider>{children}</ReviewModalProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  )
}
