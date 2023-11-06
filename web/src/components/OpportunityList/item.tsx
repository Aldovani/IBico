'use client'
import { useOpportunity } from '@/contexts/opportunityContext'
import Link from 'next/link'
import { FiBriefcase, FiEdit2, FiUsers, FiX } from 'react-icons/fi'

type OpportunityList = {
  title: string
  id: string
  value: number
}

type OpportunityListItemProps = {
  data: OpportunityList
}

export function OpportunityListItem({ data }: OpportunityListItemProps) {
  const { handleOpenDrawer, handleOpenModal } = useOpportunity()
  return (
    <li className="flex border-2 justify-between items-center border-slate-200 rounded-lg p-3">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-slate-100 rounded-full">
          <FiBriefcase size="32" color="#334155" />
        </div>

        <div className="flex flex-col">
          <h4 className="font-medium font-poppins text-slate-900 text-base">
            {data.title}
          </h4>
          <span className="font-semibold font-poppins text-slate-900 text-base">
            {data.value}
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => handleOpenDrawer(data.id)}
          className="hover:scale-105  hover:bg-blue-100 hover:border-blue-200 transition-all p-2 border text-blue-700 border-slate-200 rounded-lg"
        >
          <FiUsers size={24} />
        </button>
        <Link
          href={`opportunities/edit/${data.id}`}
          className="hover:scale-105 hover:bg-green-100 hover:border-green-200 transition-all p-2 border text-green-700 border-slate-200 rounded-lg"
        >
          <FiEdit2 size={24} />
        </Link>

        <button
          onClick={() => handleOpenModal(data)}
          className="hover:scale-105 hover:bg-red-100 hover:border-red-200 transition-all p-2 border text-red-700 border-slate-200 rounded-lg"
        >
          <FiX size={24} />
        </button>
      </div>
    </li>
  )
}
