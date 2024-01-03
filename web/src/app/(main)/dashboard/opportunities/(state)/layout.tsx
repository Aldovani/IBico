import { NavigationAside } from '@/components/NavigationAside'
import { ReactNode } from 'react'

type LayoutOpportunitiesProps = {
  children: ReactNode
}

const LINKS = [
  {
    href: '/dashboard/opportunities',
    text: 'Em aberto',
  },
  {
    href: '/dashboard/opportunities?filter=PENDING',
    text: 'Em progresso',
  },
  {
    href: '/dashboard/opportunities?filter=CLOSED',
    text: 'Finalizadas',
  },
  {
    href: '/dashboard/opportunities?filter=DISABLED',
    text: 'Desabilitadas',
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
