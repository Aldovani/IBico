import { NavigationDashboard } from '@/components/NavigationDashboard'
import { ReactNode } from 'react'

type ConfigLayoutProps = {
  children: ReactNode
}

export default function ConfigLayout({ children }: ConfigLayoutProps) {
  return (
    <>
      <NavigationDashboard />
      <div className="max-sm:pt-14">{children}</div>
    </>
  )
}
