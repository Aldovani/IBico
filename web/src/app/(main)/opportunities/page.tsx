import { OpportunitiesFeed } from '@/components/Opportunity/Feed'
import { SearchOpportunities } from '@/components/Search'

export default function Opportunities() {
  return (
    <div className=" max-w-screen-xl mx-auto pt-28 px-6 pb-16">
      <section className="max-w-lg ">
        <h1 className="font-lato font-bold text-4xl text-blue-700 ">
          Encontre uma oportunidade em poucos minutos{' '}
        </h1>
        <p className="text-slate-400 font-poppins mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis.
        </p>
      </section>

      <SearchOpportunities />

      <OpportunitiesFeed opportunities={[]} />
    </div>
  )
}
