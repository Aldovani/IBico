'use client'
import { queryClient } from '@/services/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { AuthContextProvider, User } from './authContext'
import { ReviewModalProvider } from './reviewModalContext'
import { ClientCookiesProvider } from './ClientCookies'

export type CookieRecord = {
  name: string
  value: string
}

type ContextsProvidersProps = {
  children: ReactNode
  cookies: CookieRecord[]
  user: { items: User[] } | null
}

export function AppProviders({
  children,
  cookies,
  user,
}: ContextsProvidersProps) {
  return (
    <ClientCookiesProvider value={cookies}>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider user={user}>
          <ReviewModalProvider>{children}</ReviewModalProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </ClientCookiesProvider>
  )
}
