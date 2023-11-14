import { ShareModal } from '@/components/Search/shareModal'

import { serverApi } from '@/services/api'
import { Opportunity } from '@/services/api/repositories/opportunity'
import { AxiosResponse } from 'axios'

import { notFound } from 'next/navigation'
import Link from 'next/link'

import {
  FiClock,
  FiDollarSign,
  FiSlash,
  FiCalendar,
  FiMapPin,
} from 'react-icons/fi'
import { ConfirmCandidature } from '@/components/ConfirmCandidature'
import { LinkBack } from '@/components/LinkBack'
import { SimilarOpportunities } from '@/components/Opportunity/SimilarOpportunities'
import { Suspense } from 'react'
import { Skeleton } from '@/components/skeleton'
import { formatDate } from '@/utils/formatDate'

type OpportunityDetailsProps = {
  params: { id: string }
}

async function getOpportunity(id: string) {
  try {
    const { data } = await serverApi.get<unknown, AxiosResponse<Opportunity>>(
      `/opportunities/${id}`,
    )
    return data
  } catch (err) {
    return null
  }
}

export default async function OpportunityDetails({
  params,
}: OpportunityDetailsProps) {
  const data = await getOpportunity(params.id)
  if (!data) notFound()

  return (
    <div className=" max-w-screen-xl mx-auto pt-28 px-6 pb-24 grid grid-cols-opportunity-details items-start justify-between max-lg:grid-cols-1">
      <div>
        <section className="flex items-center justify-between ">
          <div className="flex-1">
            <LinkBack />
            <h1 className="font-lato text-4xl font-bold text-slate-900 mt-4 mb-2">
              {data.title}
            </h1>
            <span className="font-poppins text-sm text-slate-400 ">
              postado {formatDate.format(new Date(data.createdAt))}
            </span>
            <div className="flex items-center gap-6 mt-4">
              <ShareModal />
              <span className="flex items-center whitespace-nowrap text-slate-400 gap-2">
                Reportar vaga
                <FiSlash />
              </span>
            </div>
          </div>

          <div className="w-48 max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:bg-slate-50  max-sm:w-full max-sm:px-6 max-sm:py-4 max-sm:border-t-2 border-slate-200 max-sm:shadow-2xl max-sm:shadow-slate-400">
            <ConfirmCandidature opportunityId={data.id} />
          </div>
        </section>

        <section className="flex justify-between gap-4 mt-6 max-md:flex-wrap">
          <div className=" flex flex-col w-full  pt-8 pl-4 pb-6 border-2 border-slate-200 rounded-md">
            <FiClock size={32} color="#1D4ED8" />
            <span className="block mt-6 mb-1 font-poppins text-slate-400 text-sm">
              Salario
            </span>
            <strong className="text-slate-900 font-poppins font-semibold">
              {data.value}
            </strong>
          </div>

          <div className="flex flex-col w-full  pt-8 pl-4 pb-6 border-2 border-slate-200 rounded-md">
            <FiDollarSign size={32} color="#1D4ED8" />
            <span className="block mt-6 mb-1 font-poppins text-slate-400 text-sm">
              Carga horaria
            </span>
            <strong className="text-slate-900 font-poppins font-semibold">
              {data.timeLoad}
            </strong>
          </div>

          <div className="flex flex-col w-full  pt-8 pl-4 pb-6 border-2 border-slate-200 rounded-md">
            <FiCalendar size={32} color="#1D4ED8" />
            <span className="block mt-6 mb-1 font-poppins text-slate-400 text-sm">
              Data
            </span>
            <strong className="text-slate-900 font-poppins font-semibold">
              {data.startDateTime}
            </strong>
          </div>

          <div className="flex flex-col w-full  pt-8 pl-4 pb-6 border-2 border-slate-200 rounded-md">
            <FiMapPin size={32} color="#1D4ED8" />
            <span className="block mt-6 mb-1 font-poppins text-slate-400 text-sm">
              Local
            </span>
            <strong className="text-slate-900 font-poppins font-semibold">
              {data.local}
            </strong>
          </div>
        </section>

        <section className="mt-10 ">
          <h3 className="text-slate-600 text-lg font-lato font-medium">
            Postado por
          </h3>
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
              alt="user picture"
              className="w-12 h-12 rounded-full"
            />
            <div className="mt-3">
              <h4 className="font-poppins text-slate-900 font-medium">
                {data.postedBy.name}
              </h4>
              <Link
                className="font-poppins text-blue-700 "
                href={`/profile/${data.postedBy.username}`}
              >
                ver perfil
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-10 ">
          <h3 className="text-slate-600 text-lg font-lato font-medium">
            Descrição
          </h3>
          <p className="font-poppins text-slate-400 mt-3">{data.description}</p>
        </section>

        <section className="mt-10 ">
          <h3 className="text-slate-600 text-lg font-lato font-medium">
            Competências
          </h3>
          <p className="font-poppins text-slate-400 mt-3">
            {data.necessarySkills.map((skill) => (
              <span key={skill.name}>{skill.name}</span>
            ))}
          </p>
        </section>
      </div>
      <section className="max-w-xs max-lg:max-w-none  w-full max-md:mt-6">
        <h2 className="text-slate-700 text-2xl font-lato font-medium ">
          Vagas semelhantes
        </h2>
        <Suspense fallback={<Skeleton className="h-100" />}>
          <SimilarOpportunities />
        </Suspense>
      </section>
    </div>
  )
}
