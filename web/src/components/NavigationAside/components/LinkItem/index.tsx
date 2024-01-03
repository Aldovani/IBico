import Link, { LinkProps } from 'next/link'
import { ReactNode } from 'react'

type LinkItemProps = { children: ReactNode; isActive: boolean } & LinkProps

export function LinkItem({ href, children, isActive }: LinkItemProps) {
  return (
    <Link
      className="w-fit py-2  pl-3 block  text-slate-400 font-poppins relative  items-center   hover:translate-x-2 transition-transform  data-[active='true']:text-blue-900 data-[active='true']:before:block data-[active='true']:before:w-1 data-[active='true']:before:h-1 data-[active='true']:before:bg-blue-900 data-[active='true']:before:rounded-full data-[active='true']:before:absolute data-[active='true']:before:left-0 data-[active='true']:before:top-1/2 data-[active='true']:before:-translate-y-1/2"
      href={href}
      data-active={isActive}
    >
      {children}
    </Link>
  )
}
