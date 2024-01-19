'use client'
import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'

import { OpportunityForm } from '@/components/Forms/Opportunity'
import { useEditOpportunity } from './useEditOpportunity'

export default function EditOpportunity() {
  const { handleRequest, isLoading, data, isDataLoading } = useEditOpportunity()
  return (
    <div className="w-full">
      <Link
        href="/dashboard/opportunities"
        className="flex mt-6  -translate-y-full items-center text-slate-500 gap-1 font-poppins font-medium "
      >
        {<FiArrowLeft size={20} />} Voltar
      </Link>

      <h1 className="text-2xl text-blue-900 font-inter font-bold mb-2">
        Edite sua oportunidade
      </h1>
      <p className="max-w-448 font-poppins text-slate-400 ">
        Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
        libero et velit interdum, ac aliquet odio mattis.
      </p>

      <OpportunityForm
        handleRequest={handleRequest}
        isDataLoading={isDataLoading}
        initialData={data}
        isLoading={isLoading}
        isEditing
      />
    </div>
  )
}
