import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

type Link = {
  width: number; left: number
}



export function useNavigationDashboard() {
  const router = usePathname().split('/')[2]

  const LINKS = [
    {
      href: '/dashboard/user',
      title: 'Configurações',
      pathName: 'user'
    },
    {
      href: '/dashboard/history',
      title: 'Histórico',
      pathName: 'history'

    },
    {
      href: '/dashboard/opportunities',
      title: 'Oportunidades',
      pathName: 'opportunities'

    },
    {
      href: '/dashboard/notifications',
      title: 'Notificações',
      pathName: 'notifications'
    },
  ]
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

  const [hoverLink, setHouverLink] = useState<Link>({
    left: 0,
    width: 0,
  })

  function handleMouseEntre(e: any) {
    const { clientWidth, offsetLeft } = e.target

    setHouverLink({ width: clientWidth, left: offsetLeft })
  }
  function handleMouseLeave() {
    setHouverLink({ width: currentLink.width, left: currentLink.left })
  }

  return {
    handleMouseEntre, handleMouseLeave,
    hoverLink,
    router,
    LINKS
  }
}