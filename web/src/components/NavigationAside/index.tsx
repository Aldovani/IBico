'use client'
import { LinkItem } from './components/LinkItem'
import { usePathname } from 'next/navigation'

type Link = {
  href: string
  text: string
}

type NavigationAsideProps = {
  links: Link[]
}

export function NavigationAside({ links }: NavigationAsideProps) {
  const pathName = usePathname()
  return (
    <nav className="h-auto">
      <ul className="h-fit sticky top-1/4 flex flex-col gap-4 justify-between max-sm:flex-row w-full">
        {links?.map(({ href, text }) => (
          <li key={text}>
            <LinkItem isActive={pathName === href} href={href}>
              {text}
            </LinkItem>
          </li>
        ))}
      </ul>
    </nav>
  )
}
