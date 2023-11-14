'use client'
import { useAuth } from '@/hooks/useAuth'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useRouter } from 'next/navigation'
import { ReactNode, useLayoutEffect } from 'react'

type PrivateRouteProps = {
  children: ReactNode
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated } = useAuth()
  const { push } = useRouter()
  const { remove } = useLocalStorage()
  useLayoutEffect(() => {
    if (!isAuthenticated) {
      push('/auth/sign-in')
      remove('token')
    }
  }, [isAuthenticated, push, remove])

  return (
    <>
      {!isAuthenticated && null}
      {isAuthenticated && children}
    </>
  )
}
