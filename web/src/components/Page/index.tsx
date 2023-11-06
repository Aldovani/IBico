'use client'

import { checkIsPublicRoute } from '@/utils/checkIsPublicRoute'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { PrivateRoute } from '../PrivateRoute'
import { PublicRoute } from '../PublicRoute'

type PageProps = {
  children: ReactNode
}

export function Page({ children }: PageProps) {
  const pathname = usePathname()
  const isPublicPage = checkIsPublicRoute(pathname)

  return (
    <>
      {isPublicPage && <PublicRoute>{children}</PublicRoute>}
      {!isPublicPage && <PrivateRoute>{children}</PrivateRoute>}
    </>
  )
}
