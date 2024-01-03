'use client'
import { FilterStatus } from '@/app/(main)/dashboard/opportunities/(state)/useOpportunity'
import { formatMoney } from '@/utils/formatMoney'
import Link from 'next/link'
import {
  FiBriefcase,
  FiEdit2,
  FiEye,
  FiUsers,
  FiX,
  FiCheck,
} from 'react-icons/fi'

type OpportunityList = {
  title: string
  id: string
  amount: number
}

export type ModalBody = OpportunityList

type OpportunityListItemProps = {
  data: OpportunityList
  onOpenModal: (data: ModalBody) => void
  type: FilterStatus
}

export function OpportunityListItem({
  data,
  onOpenModal,
  type,
}: OpportunityListItemProps) {
  return (
    <li className="flex border-2 justify-between items-center border-slate-200 rounded-lg p-3">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-slate-100 rounded-full">
          <FiBriefcase size="32" color="#334155" />
        </div>

        <div className="flex flex-col">
          <h4 className="font-medium font-poppins text-blue-900 text-base">
            {data.title}
          </h4>
          <span className="font-semibold font-poppins text-slate-500 text-base">
            {formatMoney.format(data.amount)}
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        {type === 'CREATED' && (
          <>
            <Link
              href={`/opportunities/${data.id}`}
              className="hover:scale-105 hover:bg-blue-900/10 hover:border-blue-900 transition-all p-2 border text-blue-900 border-slate-200 rounded-lg"
            >
              <FiEye size={24} />
            </Link>

            <Link
              href={`opportunities/candidates/${data.id}`}
              className="hover:scale-105  hover:bg-blue-900/10 hover:border-blue-900 transition-all p-2 border text-blue-900 border-slate-200 rounded-lg"
            >
              <FiUsers size={24} />
            </Link>

            <Link
              href={`opportunities/edit/${data.id}`}
              className="hover:scale-105 hover:bg-green-100 hover:border-green-200 transition-all p-2 border text-green-700 border-slate-200 rounded-lg"
            >
              <FiEdit2 size={24} />
            </Link>

            <button
              onClick={() => onOpenModal(data)}
              className="hover:scale-105 hover:bg-rose-100 hover:border-rose-200 transition-all p-2 border text-rose-700 border-slate-200 rounded-lg"
            >
              <FiX size={24} />
            </button>
          </>
        )}

        {type === 'PENDING' && (
          <>
            <button
              onClick={() => onOpenModal(data)}
              className="hover:scale-105 hover:bg-green-100 hover:border-green-200 transition-all p-2 border text-green-700 border-slate-200 rounded-lg"
            >
              <FiCheck size={24} />
            </button>
          </>
        )}
      </div>
    </li>
  )
}
