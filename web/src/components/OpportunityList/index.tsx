'use client'

import { Opportunity } from '@/services/api/repositories/opportunity'
import { ModalBody, OpportunityListItem } from './item'
import { Skeleton } from '../skeleton'

type OpportunityListProps = {
  onOpenDrawer: (id: string) => void
  onOpenModal: (data: ModalBody) => void
  opportunities: Opportunity[] | []
  isLoading: boolean
  isEmpty: boolean
}

export function OpportunityList({
  onOpenDrawer,
  onOpenModal,
  opportunities,
  isLoading,
  isEmpty,
}: OpportunityListProps) {
  return (
    <>
      <ul className="[&>*:not(:first-child)]:mt-3">
        {isLoading && (
          <>
            <Skeleton className="h-16 " />
            <Skeleton className="h-16 " />
            <Skeleton className="h-16 " />
            <Skeleton className="h-16 " />
          </>
        )}
        {!isLoading && isEmpty && <h1>Lista vazia</h1>}
        {opportunities?.map((opportunity) => {
          if (!opportunity) return null
          return (
            <OpportunityListItem
              onOpenDrawer={onOpenDrawer}
              onOpenModal={onOpenModal}
              key={opportunity.id}
              data={opportunity}
            />
          )
        })}
      </ul>
    </>
  )
}
