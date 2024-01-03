import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

type LinkPositionProps = {
  width: number
  left: number
}

const LINKS = [
  {
    href: '/dashboard/user',
    title: 'Configurações',
    pathName: 'user',
  },
  {
    href: '/dashboard/history',
    title: 'Histórico',
    pathName: 'history',
  },
  {
    href: '/dashboard/opportunities',
    title: 'Oportunidades',
    pathName: 'opportunities',
  },
  {
    href: '/dashboard/candidatures',
    title: 'Candidaturas',
    pathName: 'candidatures',
  },
  {
    href: '/dashboard/notifications',
    title: 'Notificações',
    pathName: 'notifications',
  },
]

export function useNavigationDashboard() {
  const router = usePathname().split('/')[2]

  const [currentLink, setCurrentLink] = useState<{
    width: number
    left: number
  }>({
    left: 0,
    width: 0,
  })
  useEffect(() => {
    const currentActiveLink = document.querySelector<HTMLElement>(
      '[data-active="true"]',
    )

    setCurrentLink({
      width: currentActiveLink?.clientWidth || 0,
      left: currentActiveLink?.offsetLeft || 0,
    })
    setHouverLink({
      width: currentActiveLink?.clientWidth || 0,
      left: currentActiveLink?.offsetLeft || 0,
    })
  }, [router])

  const [hoverLink, setHouverLink] = useState<LinkPositionProps>({
    left: 0,
    width: 0,
  })

  function handleMouseEntre({ left, width }: LinkPositionProps) {
    setHouverLink({
      width,
      left,
    })
  }
  function handleMouseLeave() {
    setHouverLink({ width: currentLink.width, left: currentLink.left })
  }

  return {
    handleMouseEntre,
    handleMouseLeave,
    hoverLink,
    router,
    LINKS,
  }
}
