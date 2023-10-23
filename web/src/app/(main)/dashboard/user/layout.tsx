import { NavigationAside } from '@/components/NavigationAside'
import { ReactNode } from 'react'

type LayoutUserProps = {
  children: ReactNode
}
const LINKS = [
  {
    href: '/dashboard/user',
    text: 'Perfil',
  },
  {
    href: '/dashboard/user/skills',
    text: 'Competências',
  },
  {
    href: '/dashboard/user/password',
    text: 'Senha',
  },
  {
    href: '/dashboard/user/notification',
    text: 'Notificação',
  },
]

export default function LayoutUser({ children }: LayoutUserProps) {
  return (
    <main className="flex gap-20  max-w-screen-xl  mx-auto pt-14  px-6 pb-11 max-sm:flex-col max-sm:gap-5">
      <NavigationAside links={LINKS} />

      {children}
    </main>
  )
}
