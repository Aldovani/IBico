import { ShareModal } from '@/components/Search/shareModal'
import { Opportunity } from '@/services/api/repositories/opportunity'
import { notFound } from 'next/navigation'
import Link from 'next/link'

import {
  FiClock,
  FiDollarSign,
  FiSlash,
  FiCalendar,
  FiMapPin,
} from 'react-icons/fi'
import { cookies } from 'next/headers'
import { ConfirmCandidature } from '@/components/ConfirmCandidature'
import { LinkBack } from '@/components/LinkBack'
import { SimilarOpportunities } from '@/components/Opportunity/SimilarOpportunities'
import { Suspense } from 'react'
import { formatDate } from '@/utils/formatDate'
import { formatMoney } from '@/utils/formatMoney'
import { api } from '@/services/api'
import Image from 'next/image'
import { SimilarOpportunitiesSkeleton } from '@/components/Opportunity/SimilarOpportunities/SimilarOpportunitiesSkeleton'

type OpportunityDetailsProps = {
  params: { id: string }
}

export const revalidate = 1

async function getOpportunity(id: string) {
  try {
    const [opportunity, candidature] = await Promise.all([
      api.get(`http://localhost:8080/opportunities/${id}`, {
        headers: { cookie: cookies().toString() },
      }),
      api.get(`http://localhost:8080/candidatures/${id}`, {
        headers: { cookie: cookies().toString() },
      }),
    ])

    return {
      candidature: candidature.data,
      opportunity: opportunity.data.data as Opportunity,
    }
  } catch (err) {
    return null
  }
}

export default async function OpportunityDetails({
  params,
}: OpportunityDetailsProps) {
  const data = await getOpportunity(params.id)
  if (!data?.opportunity) notFound()
  const { candidature, opportunity } = data
  return (
    <div className=" max-w-screen-xl mx-auto pt-28 px-6 pb-24 grid grid-cols-opportunity-details items-start justify-between max-lg:grid-cols-1">
      <div>
        <section className="flex items-center justify-between ">
          <div className="flex-1">
            <LinkBack />
            <h1 className="font-inter text-4xl font-bold text-blue-900 mt-4 mb-2">
              {opportunity.title}
            </h1>
            <span className="font-poppins text-sm text-slate-400 ">
              postado{' '}
              {formatDate(new Date(opportunity.createdAt), {
                dateStyle: 'full',
              })}
            </span>
            <div className="flex items-center gap-6 mt-4">
              <ShareModal
                url={`localhost:3000/opportunities/${data.opportunity.id}`}
              />
              <span className="flex items-center whitespace-nowrap text-rose-600 gap-2 cursor-pointer hover:text-red-900">
                Reportar vaga
                <FiSlash />
              </span>
            </div>
          </div>

          <div className="w-48 max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:bg-slate-50  max-sm:w-full max-sm:px-6 max-sm:py-4 max-sm:border-t-2 border-slate-200 max-sm:shadow-2xl max-sm:shadow-slate-400">
            <ConfirmCandidature
              authorUsername={opportunity.postBy.username}
              isCandidate={candidature.isCandidate}
              opportunityId={opportunity.id}
            />
          </div>
        </section>

        <section className="flex justify-between gap-4 mt-6 max-md:flex-wrap">
          <div className=" flex flex-col w-full  pt-8 pl-4 pb-6 border-2 border-slate-200 rounded-md">
            <FiDollarSign size={32} className="text-blue-900" />
            <span className="block mt-6 mb-1 font-poppins text-slate-400 text-sm">
              Salario
            </span>
            <strong className="text-blue-900 font-poppins font-semibold">
              {formatMoney.format(opportunity.amount)}
            </strong>
          </div>

          <div className="flex flex-col w-full  pt-8 pl-4 pb-6 border-2 border-slate-200 rounded-md">
            <FiClock size={32} className="text-blue-900" />
            <span className="block mt-6 mb-1 font-poppins text-slate-400 text-sm">
              Carga horaria
            </span>
            <strong className="text-blue-900 font-poppins font-semibold">
              {opportunity.timeLoad}
            </strong>
          </div>

          <div className="flex flex-col w-full  pt-8 pl-4 pb-6 border-2 border-slate-200 rounded-md">
            <FiCalendar size={32} className="text-blue-900" />
            <span className="block mt-6 mb-1 font-poppins text-slate-400 text-sm">
              Data
            </span>
            <strong className="text-blue-900 font-poppins font-semibold">
              {formatDate(new Date(opportunity.startDateTime))}
            </strong>
          </div>

          <div className="flex flex-col w-full  pt-8 pl-4 pb-6 border-2 border-slate-200 rounded-md">
            <FiMapPin size={32} className="text-blue-900" />
            <span className="block mt-6 mb-1 font-poppins text-slate-400 text-sm">
              Local
            </span>
            <strong className="text-blue-900 font-poppins font-semibold">
              {opportunity.local}
            </strong>
          </div>
        </section>

        <section className="mt-10 ">
          <h3 className="text-slate-600 text-lg font-inter font-medium">
            Postado por
          </h3>
          <div className="flex items-center gap-3">
            <Image
              src={opportunity.postBy.avatar}
              alt="user picture"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full"
            />
            <div className="mt-3">
              <h4 className="font-poppins text-blue-900 font-medium">
                {opportunity.postBy.name}
              </h4>
              <Link
                className="font-poppins text-blue-900 "
                href={`/profile/${opportunity.postBy.username}`}
              >
                ver perfil
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-10 ">
          <h3 className="text-slate-600 text-lg font-inter font-medium">
            Descrição
          </h3>
          <p className="font-poppins text-slate-400 mt-3">
            {opportunity.description}
          </p>
        </section>

        <section className="mt-10 ">
          <h3 className="text-slate-600 text-lg font-inter font-medium">
            Competências
          </h3>
          <p className="font-poppins text-slate-400 mt-3">
            {opportunity.skills.map((skill, index) => (
              <span key={index}>{skill}</span>
            ))}
          </p>
        </section>
      </div>
      <section className="max-w-xs max-lg:max-w-none  w-full max-md:mt-6">
        <h2 className="text-blue-900 text-2xl font-inter font-medium mb-3 ">
          Vagas semelhantes
        </h2>
        <Suspense fallback={<SimilarOpportunitiesSkeleton />}>
          <SimilarOpportunities />
        </Suspense>
      </section>
    </div>
  )
}
