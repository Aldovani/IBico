import Link, { LinkProps } from 'next/link'
import { ReactNode } from 'react'

type ActiveLinkProps = {
  isActive: boolean
  children: ReactNode
} & LinkProps

export function ActiveLink({
  href,
  onMouseEnter,
  isActive,
  children,
}: ActiveLinkProps) {
  return (
    <Link
      href={href}
      className="font-poppins data-[active='true']:text-blue-900 block px-3 py-2"
      onMouseEnter={onMouseEnter}
      data-active={isActive}
    >
      {children}
    </Link>
  )
}
