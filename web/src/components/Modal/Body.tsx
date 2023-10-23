import { ReactNode } from 'react'

type BodyProps = {
  children: ReactNode
}
export function Body({ children }: BodyProps) {
  return <main className="mt-4">{children}</main>
}
