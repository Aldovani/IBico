'use client'

import { Modal } from '@/components/Modal'
import Link from 'next/link'
import { FiUser, FiX, FiXCircle, FiLink } from 'react-icons/fi'
import { useApplications } from './useApplications'
import { Skeleton } from '@/components/skeleton'

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
  } = useApplications()
  return (
    <div className="w-full">
      <section className="flex items-center justify-between border-b-2 border-slate-200 pb-6">
        <div className="max-w-304">
          <h1 className="font-inter text-xl text-slate-900 font-bold mb-2">
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
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
            </>
          )}
          {!isLoading && isEmpty && (
            <p>Voce não possui nenhuma candidatura ativa no momento</p>
          )}

          {candidatures.map((candidacy) => (
            <li
              key={candidacy.id}
              className="flex border-2  items-center border-slate-200 rounded-lg p-3"
            >
              <div className="p-3 bg-slate-100 rounded-full">
                <FiUser size="32" color="#334155" />
              </div>

              <div className="flex flex-col">
                <h4 className="font-medium font-poppins text-slate-900 text-base">
                  {candidacy.candidateName}
                </h4>
                <span className="text-xs font-poppins text-slate-400">
                  por{' '}
                  <Link
                    href={`/profile/${candidacy.candidateUsername}`}
                    className="text-blue-700"
                  >
                    {candidacy.candidateUsername}
                  </Link>
                </span>
              </div>

              <div className="flex gap-2 ml-auto">
                <Link
                  href={`/opportunities/${candidacy.opportunityId}`}
                  className="hover:scale-105 hover:bg-blue-100 hover:border-blue-200 transition-all p-2 border text-blue-700 border-slate-200 rounded-lg"
                >
                  <FiLink size={24} />
                </Link>
                <button
                  onClick={() => handleOpenModal(candidacy.id)}
                  className="hover:scale-105 hover:bg-red-100 hover:border-red-200 transition-all p-2 border text-red-700 border-slate-200 rounded-lg"
                >
                  <FiX size={24} />
                </button>
              </div>
            </li>
          ))}
        </ul>
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
              <div className="p-1 bg-red-100 rounded-lg text-red-700">
                <FiXCircle size={18} />
              </div>
              <h4 className="font-inter text-2xl font-semibold">
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
