import { Opportunity } from '@/services/api/repositories/opportunity'
import { formatMoney } from '@/utils/formatMoney'
import Link from 'next/link'
import { FiClock, FiDollarSign } from 'react-icons/fi'
type OpportunityItemProps = {
  data: Opportunity
}

export function OpportunityItem({ data }: OpportunityItemProps) {
  return (
    <article className="border-x border-y border-slate-200 rounded-lg min-w-full px-4 py-6">
      <header>
        <h3 className="font-inter font-semibold text-xl">{data.title}</h3>
        <span className="font-poppins text-xs text-slate-500">
          por
          <Link
            href={`profile/${data.postedBy.username}`}
            className="text-blue-500"
          >
            {data.postedBy.name}
          </Link>
        </span>
      </header>
      <main className="mt-3">
        <p className="text-slate-400 text-xs font-poppins ">
          {data.description}
        </p>

        <div className="mt-4 flex items-center gap-5 ">
          <div className="flex items-center gap-1 ">
            <FiClock size={16} color="#64748B" />
            <span className="text-slate-400 font-poppins">{data.timeLoad}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiDollarSign size={16} color="#64748B" />
            <span className="text-slate-400 font-poppins">
              {formatMoney.format(data.value)}
            </span>
          </div>
        </div>
      </main>

      <footer className="mt-5">
        <Link
          href={`opportunities/${data.id}`}
          className="text-blue-700 font-poppins"
        >
          Ver vaga
        </Link>
      </footer>
    </article>
  )
}
