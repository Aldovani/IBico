'use client'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

type PublicRouteProps = {
  children: ReactNode
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated } = useAuth()
  const { push } = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      push('/opportunities')
    }
  }, [isAuthenticated, push])

  return (
    <>
      {isAuthenticated && null}
      {!isAuthenticated && children}
    </>
  )
}
