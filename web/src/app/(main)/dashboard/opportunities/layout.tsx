import { NavigationAside } from '@/components/NavigationAside'
import { ReactNode } from 'react'

type LayoutOpportunitiesProps = {
  children: ReactNode
}

const LINKS = [
  {
    href: '/dashboard/opportunities',
    text: 'Minha oportunidades',
  },
  {
    href: '/dashboard/opportunities/applications',
    text: 'minha candidaturas',
  },
]

export default function LayoutOpportunities({
  children,
}: LayoutOpportunitiesProps) {
  return (
    <main className="flex gap-20  max-w-screen-xl  mx-auto pt-14  px-6 pb-11 ">
      <NavigationAside links={LINKS} />
      {children}
    </main>
  )
}
