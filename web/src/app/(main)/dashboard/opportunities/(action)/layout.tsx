import { ReactNode } from 'react'

type LayoutOpportunitiesProps = {
  children: ReactNode
}

export default function LayoutOpportunities({
  children,
}: LayoutOpportunitiesProps) {
  return (
    <main className="flex gap-20  max-w-screen-xl  mx-auto pt-5  px-6 pb-11 max-sm:flex-col max-sm:gap-5 ">
      {children}
    </main>
  )
}
