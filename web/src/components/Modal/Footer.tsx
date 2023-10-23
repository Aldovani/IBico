import { ReactNode } from 'react'

type FooterProps = {
  children: ReactNode
}

export function Footer({ children }: FooterProps) {
  return (
    <footer className="mt-8 gap-2 border-slate-200 flex items-center justify-end">
      {children}
    </footer>
  )
}
