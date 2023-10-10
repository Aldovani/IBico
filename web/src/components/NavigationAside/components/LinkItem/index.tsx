import Link, { LinkProps } from 'next/link'
import { ReactNode } from 'react'

type LinkItemProps = { children: ReactNode; isActive: boolean } & LinkProps

export function LinkItem({ href, children, isActive }: LinkItemProps) {
  return (
    <Link
      className="w-full py-2 pl-3 text-slate-400 font-poppins relative flex gap-2 items-center  hover:translate-x-2 transition-transform  data-[active='true']:text-blue-700 data-[active='true']:before:block data-[active='true']:before:w-1 data-[active='true']:before:h-1 data-[active='true']:before:bg-blue-700 data-[active='true']:before:rounded-full"
      href={href}
      data-active={isActive}
    >
      {children}
    </Link>
  )
}
