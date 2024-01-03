import { Opportunity } from '@/services/api/repositories/opportunity'
import Link from 'next/link'
import { FiMapPin } from 'react-icons/fi'
type OpportunityItemProps = {
  data: Opportunity
}

export function OpportunityItem({ data }: OpportunityItemProps) {
  return (
    <article className="border-x border-y border-slate-200 rounded-lg min-w-full px-4 py-6">
      <header>
        <h3 className="font-inter text-blue-900 font-semibold text-xl">
          {data.title}
        </h3>
        <span className="font-poppins text-xs text-slate-500">
          por
          <Link
            href={`/profile/${data.postBy.username}`}
            className="text-blue-900"
          >
            {' '}
            {data.postBy.name}
          </Link>
        </span>
      </header>
      <main className="mt-3">
        <p className="text-slate-400 text-xs font-poppins break-words	 ">
          {data.description.substring(0, 150)}
        </p>

        <div className="flex items-center gap-1 mt-3 ">
          <FiMapPin size={16} color="#64748B" />
          <span className="text-slate-400 font-poppins">{data.local}</span>
        </div>
      </main>

      <footer className="mt-5">
        <Link
          href={`/opportunities/${data.id}`}
          className="text-blue-900 font-poppins font-medium"
        >
          Ver vaga
        </Link>
      </footer>
    </article>
  )
}
