'use client'

import { Opportunity } from '@/services/api/repositories/opportunity'
import { ModalBody, OpportunityListItem } from './item'
import { Skeleton } from '../skeleton'
import { OpportunityListEmpty } from './EmptyList'
import { FilterStatus } from '@/app/(main)/dashboard/opportunities/(state)/useOpportunity'

type OpportunityListProps = {
  onOpenModal: (data: ModalBody) => void
  opportunities: Opportunity[] | []
  isLoading: boolean
  isEmpty: boolean
  filter: FilterStatus
}

export function OpportunityList({
  onOpenModal,
  opportunities,
  isLoading,
  isEmpty,
  filter,
}: OpportunityListProps) {
  return (
    <>
      <ul className="[&>*:not(:first-child)]:mt-3">
        {isLoading && (
          <>
            <div className="flex justify-between items-center p-3 border border-slate-200 rounded-2xl">
              <div className="flex gap-4 items-center">
                <Skeleton className="h-14 w-14 rounded-full" />

                <div className="flex flex-col gap-2">
                  <Skeleton className="h-5 w-24  " />
                  <Skeleton className="h-4 w-20  " />
                </div>
              </div>
              <Skeleton className="h-10 w-28" />
            </div>
            <div className="flex justify-between items-center p-3 border border-slate-200 rounded-2xl">
              <div className="flex gap-4 items-center">
                <Skeleton className="h-14 w-14 rounded-full" />

                <div className="flex flex-col gap-2">
                  <Skeleton className="h-5 w-24  " />
                  <Skeleton className="h-4 w-20  " />
                </div>
              </div>
              <Skeleton className="h-10 w-28" />
            </div>
            <div className="flex justify-between items-center p-3 border border-slate-200 rounded-2xl">
              <div className="flex gap-4 items-center">
                <Skeleton className="h-14 w-14 rounded-full" />

                <div className="flex flex-col gap-2">
                  <Skeleton className="h-5 w-24  " />
                  <Skeleton className="h-4 w-20  " />
                </div>
              </div>
              <Skeleton className="h-10 w-28" />
            </div>
            <div className="flex justify-between items-center p-3 border border-slate-200 rounded-2xl">
              <div className="flex gap-4 items-center">
                <Skeleton className="h-14 w-14 rounded-full" />

                <div className="flex flex-col gap-2">
                  <Skeleton className="h-5 w-24  " />
                  <Skeleton className="h-4 w-20  " />
                </div>
              </div>
              <Skeleton className="h-10 w-28" />
            </div>
          </>
        )}

        {!isLoading && isEmpty && <OpportunityListEmpty />}

        {!isLoading &&
          opportunities?.map((opportunity) => (
            <OpportunityListItem
              onOpenModal={onOpenModal}
              key={opportunity.id}
              type={filter}
              data={opportunity}
            />
          ))}
      </ul>
    </>
  )
}
