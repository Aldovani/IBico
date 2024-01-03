import { NavigationAside } from '@/components/NavigationAside'
import { ReactNode } from 'react'

type LayoutOpportunitiesProps = {
  children: ReactNode
}

const LINKS = [
  {
    href: '/dashboard/candidatures',
    text: 'Em aberto',
    queryParams: '',
  },
  {
    href: '/dashboard/candidatures?filter=progress',
    text: 'Em progresso',
    queryParams: 'progress',
  },
  {
    href: '/dashboard/candidatures?filter=finished',
    text: 'Finalizadas',
    queryParams: 'finished',
  },
]

export default function LayoutOpportunities({
  children,
}: LayoutOpportunitiesProps) {
  return (
    <main className="flex gap-20  max-w-screen-xl  mx-auto pt-14  px-6 pb-11 max-sm:flex-col max-sm:gap-5 ">
      <NavigationAside links={LINKS} />
      {children}
    </main>
  )
}
