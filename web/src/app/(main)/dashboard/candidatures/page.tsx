'use client'

import { Modal } from '@/components/Modal'
import Link from 'next/link'
import { FiUser, FiX, FiXCircle, FiLink } from 'react-icons/fi'
import { useApplications } from './useApplications'
import { Skeleton } from '@/components/skeleton'
import { Pagination } from '@/components/Pagination'
import { CandidaturesListEmpty } from '@/components/CandidaturesListEmpty'

export default function Applications() {
  const {
    handleAnimationEndClose,
    handleClose,
    handleOpenModal,
    isLeave,
    isMounted,
    isOpen,
    candidatures,
    isLoading,
    handleUnsubscribe,
    isUnsubscribeLoading,
    isEmpty,
    currentPage,
    totalElements,
    totalPages,
    handleSetPage,
  } = useApplications()

  return (
    <div className="flex-1">
      <section className="flex items-center justify-between border-b-2 border-slate-200 pb-6">
        <div className="max-w-304">
          <h1 className="font-inter text-xl text-blue-900 font-medium mb-2">
            Minhas candidaturas
          </h1>
          <p className="font-poppins text-slate-400 text-sm">
            confira todas suas oportunidades que voce aplicou q ainda está
            aberto
          </p>
        </div>
      </section>

      <div className="mt-6">
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

          {!isLoading && isEmpty && <CandidaturesListEmpty />}

          {!isLoading &&
            candidatures.map((candidature) => (
              <li
                key={candidature.id}
                className="flex gap-2 border-2  items-center border-slate-200 rounded-lg p-3"
              >
                <div className="p-3 bg-slate-100 rounded-full">
                  <FiUser size="32" color="#334155" />
                </div>

                <div className="flex flex-col">
                  <h4 className="font-medium font-poppins text-blue-900 text-base">
                    {candidature.opportunity.title}
                  </h4>
                  <span className="text-xs font-poppins text-slate-400">
                    por{' '}
                    <Link
                      href={`/profile/${candidature.opportunity.author.username}`}
                      className="text-blue-900"
                    >
                      {candidature.opportunity.author.name}
                    </Link>
                  </span>
                </div>

                <div className="flex gap-2 ml-auto">
                  <Link
                    href={`/opportunities/${candidature.opportunityId}`}
                    className="hover:scale-105 hover:bg-blue-900/10 hover:border-blue-900 transition-all p-2 border text-blue-900 border-slate-200 rounded-lg"
                  >
                    <FiLink size={24} />
                  </Link>
                  <button
                    onClick={() => handleOpenModal(candidature.id)}
                    className="hover:scale-105 hover:bg-rose-100 hover:border-rose-200 transition-all p-2 border text-rose-600 border-slate-200 rounded-lg"
                  >
                    <FiX size={24} />
                  </button>
                </div>
              </li>
            ))}
        </ul>
        {!isLoading && !isEmpty && (
          <Pagination
            currentPage={currentPage}
            pageSize={10}
            totalElements={totalElements}
            totalPages={totalPages}
            onChangePage={handleSetPage}
          />
        )}
      </div>

      <Modal.Overlay isOpen={isOpen} onClose={handleClose}>
        <Modal.Container
          isMounted={isMounted}
          onAnimationEnd={handleAnimationEndClose}
          isLeave={isLeave}
          isOpen={isOpen}
        >
          <Modal.Header onClose={handleClose}>
            <div className="flex items-center gap-2">
              <div className="p-1 bg-rose-100 rounded-lg text-rose-600">
                <FiXCircle size={18} />
              </div>
              <h4 className="font-inter text-xl font-medium text-rose-600">
                Voce deseja desistir
              </h4>
            </div>
          </Modal.Header>
          <Modal.Body>
            <p className="text-slate-400 font-poppins text-sm">
              Tem certeza de que deseja desistir desta{' '}
              <strong>oportunidade</strong>?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Modal.Action onClick={handleClose}>Cancelar</Modal.Action>
            <Modal.Action
              onClick={handleUnsubscribe}
              isLoading={isUnsubscribeLoading}
              actions="dangerous"
            >
              Desistir da oportunidade
            </Modal.Action>
          </Modal.Footer>
        </Modal.Container>
      </Modal.Overlay>
    </div>
  )
}
