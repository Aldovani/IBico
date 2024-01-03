'use client'
import { LinkItem } from './components/LinkItem'
import { usePathname, useSearchParams } from 'next/navigation'

type Link = {
  href: string
  text: string
}

type NavigationAsideProps = {
  links: Link[]
}

export function NavigationAside({ links }: NavigationAsideProps) {
  const queryParams = useSearchParams()
  const pathname = usePathname()
  const filter = queryParams.get('filter') || ''
  return (
    <nav className="h-auto ">
      <ul className="h-fit sticky  top-1/4 flex flex-col gap-4 justify-between max-sm:flex-row w-full">
        {links?.map(({ href, text }) => {
          const hrefWithoutQueryParams = href.split('?')
          const path = hrefWithoutQueryParams[0]
          const queryParams = hrefWithoutQueryParams[1]?.split('=')[1] || ''
          const isActive = pathname === path && filter === queryParams

          return (
            <li key={text}>
              <LinkItem isActive={isActive} href={href}>
                {text}
              </LinkItem>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
