import Link from 'next/link'
import { FiClock, FiDollarSign } from 'react-icons/fi'
type OpportunityItemProps = {
  data: {
    title: string
    id: string
    description: string
    time: string
    value: string
  }
}

export function OpportunityItem({ data }: OpportunityItemProps) {
  return (
    <article className="border-x border-y border-slate-200 rounded-lg min-w-full px-4 py-6">
      <header>
        <h3 className="font-lato font-semibold text-xl">Faxineira</h3>
        <span className="font-poppins text-xs text-slate-500">
          por
          <Link href="user/id-muito-foda" className="text-blue-500">
            {' '}
            Luize Santos da silva{' '}
          </Link>
        </span>
      </header>
      <main className="mt-3">
        <p className="text-slate-400 text-xs font-poppins ">
          Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis.
        </p>

        <div className="mt-4 flex items-center gap-5 ">
          <div className="flex items-center gap-1 ">
            <FiClock size={16} color="#64748B" />
            <span className="text-slate-400 font-poppins">12h</span>
          </div>
          <div className="flex items-center gap-1">
            <FiDollarSign size={16} color="#64748B" />
            <span className="text-slate-400 font-poppins">R$150/h</span>
          </div>
        </div>
      </main>

      <footer className="mt-5">
        <Link
          href="opportunities/id-muito-foda/"
          className="text-blue-700 font-poppins"
        >
          Ver vaga
        </Link>
      </footer>
    </article>
  )
}
