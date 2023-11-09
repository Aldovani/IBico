import Link from 'next/link'
import { ReactNode } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const shareItem = tv({
  base: 'p-3 border-x border-y  transition-colors border-slate-200 rounded-lg',
  variants: {
    social: {
      whatsapp:
        ' hover:text-green-700 hover:bg-green-50 hover:border-green-200',
      facebook: 'hover:text-blue-700 hover:bg-blue-50 hover:border-blue-200',
      twitter: 'hover:text-sky-700 hover:bg-sky-50 hover:border-sky-200',
      telegram: 'hover:text-cyan-700 hover:bg-cyan-50 hover:border-cyan-200',
      linkedin: 'hover:text-cyan-700 hover:bg-cyan-50 hover:border-cyan-200',
    },
  },
})

type ShareItemProps = {
  href: string
  children: ReactNode
} & VariantProps<typeof shareItem>

export function ShareItem({ children, href, social }: ShareItemProps) {
  return (
    <Link href={href} target="_blank" className={shareItem({ social })}>
      {children}
    </Link>
  )
}
