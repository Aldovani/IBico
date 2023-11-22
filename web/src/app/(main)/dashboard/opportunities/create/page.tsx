'use client'

import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'
import { useCreateOpportunity } from './useCreateOpportunity'
import { OpportunityForm } from '@/components/Forms/Opportunity'

export default function CreateOpportunity() {
  const { isLoading, handleRequest } = useCreateOpportunity()
  return (
    <div className="w-full">
      <Link
        href="/dashboard/opportunities"
        className="flex  -translate-y-full items-center text-slate-500 gap-1 font-poppins font-medium "
      >
        {<FiArrowLeft size={20} />} Voltar
      </Link>

      <h1 className="text-2xl text-slate-900 font-inter font-bold mb-2">
        Publique sua oportunidade
      </h1>
      <p className="max-w-md font-poppins text-slate-500 ">
        Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
        libero et velit interdum, ac aliquet odio mattis.
      </p>

      <OpportunityForm handleRequest={handleRequest} isLoading={isLoading} />
    </div>
  )
}
