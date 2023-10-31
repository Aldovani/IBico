import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { OpportunityList } from '../List'

type OpportunitiesFeedProps = {
  opportunities: []
}

export function OpportunitiesFeed({ opportunities }: OpportunitiesFeedProps) {
  return (
    <section className="mt-12 pb-16">
      <header className="flex items-center justify-between">
        <p className="text-slate-500 text-base font-poppins">
          <strong className="text-blue-700">08 </strong>
          Oportunidades encontradas
        </p>

        <p className="text-slate-500 text-base  font-poppins">
          ordenar por <strong className="text-blue-700 ">Alfabética</strong>
        </p>
      </header>

      <OpportunityList opportunities={opportunities} />

      <footer className="flex justify-end items-center gap-2 mt-5">
        <div className="rounded-lg h-8 w-8 border-x border-y border-slate-200 flex items-center justify-center">
          <FiChevronLeft size="16" color="#64748B" />
        </div>
        <div className="font-poppins text-sm text-blue-700 bg-blue-50 rounded-lg font-medium h-8 w-8 border-x border-y border-blue-500 flex items-center justify-center">
          1
        </div>
        <div className="font-poppins text-sm text-slate-500 rounded-lg font-medium h-8 w-8 border-x border-y border-slate-200 flex items-center justify-center">
          2
        </div>
        <div className="font-poppins text-sm text-slate-500 rounded-lg font-medium h-8 w-8 border-x border-y border-slate-200 flex items-center justify-center">
          3
        </div>
        <div className="rounded-lg h-8 w-8 border-x border-y border-slate-200 flex items-center justify-center">
          <FiChevronRight size="16" color="#64748B" />
        </div>
      </footer>
    </section>
  )
}
