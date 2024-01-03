import { CandidateList } from '@/components/CandidateList'
import { LinkBack } from '@/components/LinkBack'

type CandidatesPageProps = {
  params: {
    id: string
  }
}

export default function CandidatesPage({ params }: CandidatesPageProps) {
  return (
    <div className="w-full">
      <LinkBack />
      <section className="mt-6 flex items-center justify-between border-b-2 border-slate-200 pb-6">
        <div className="max-w-304">
          <h1 className="font-inter text-xl text-blue-900  font-bold mb-2 ">
            Candidatos
          </h1>
          <p className="font-poppins text-slate-400 text-sm">
            confira todas os candidatos que aplicaram para a sua oportunidade
          </p>
        </div>
      </section>
      <CandidateList opportunityId={params.id} />
    </div>
  )
}
