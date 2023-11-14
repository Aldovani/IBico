import { OpportunitiesFeed } from '@/components/Opportunity/Feed'
import { SearchOpportunities } from '@/components/Opportunity/SearchOpportunities'
import { OpportunitiesFeedProvider } from '@/contexts/OpportunitiesFeedContext'

export default function Opportunities() {
  return (
    <main className=" max-w-screen-xl mx-auto pt-28 px-6 pb-16">
      <section className="max-w-lg ">
        <h1 className="font-lato font-bold text-4xl text-blue-700 ">
          Encontre uma oportunidade em poucos minutos{' '}
        </h1>
        <p className="text-slate-400 font-poppins mt-2">
          Desperte seu potencial e descubra possibilidades incríveis em apenas
          alguns cliques. Encontre uma oportunidade em poucos minutos e
          transforme seu caminho agora mesmo!
        </p>
      </section>
      <OpportunitiesFeedProvider>
        <SearchOpportunities />
        <OpportunitiesFeed />
      </OpportunitiesFeedProvider>
    </main>
  )
}
