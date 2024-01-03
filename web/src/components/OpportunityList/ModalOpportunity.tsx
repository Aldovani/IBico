'use client'

import { Modal } from '../Modal'
import { FiXCircle } from 'react-icons/fi'
import { AnimationEvent } from 'react'
import { FilterStatus } from '@/app/(main)/dashboard/opportunities/(state)/useOpportunity'

type ModalBody = {
  title: string
  id: string
  amount: number
}

type onFinishedOpportunityProps = {
  opportunityId: string
  status: FilterStatus
}
type ModalOpportunity = {
  isLeave: boolean
  isOpen: boolean
  isMounted: boolean
  isDeleteLoading: boolean
  isFinishedLoading: boolean
  onDeleteOpportunity: () => void
  onFinishedOpportunity: ({
    opportunityId,
    status,
  }: onFinishedOpportunityProps) => void
  onClose: () => void
  body: ModalBody | undefined
  type: FilterStatus
  onAnimationEndClose: (e: AnimationEvent<HTMLDivElement>) => void
}

export function ModalOpportunity({
  body,
  isLeave,
  isOpen,
  onAnimationEndClose,
  onClose,
  onDeleteOpportunity,
  isDeleteLoading,
  isMounted,
  isFinishedLoading,
  onFinishedOpportunity,
  type,
}: ModalOpportunity) {
  return (
    <Modal.Overlay isOpen={isOpen} onClose={onClose}>
      <Modal.Container
        isMounted={isMounted}
        onAnimationEnd={onAnimationEndClose}
        isLeave={isLeave}
        isOpen={isOpen}
      >
        {type === 'CREATED' && (
          <>
            <Modal.Header onClose={onClose}>
              <div className="flex items-center gap-2">
                <div className="p-1 bg-rose-100 rounded-lg text-rose-600">
                  <FiXCircle size={18} />
                </div>
                <h4 className="font-inter text-xl font-medium text-rose-600">
                  Voce deseja excluir
                </h4>
              </div>
            </Modal.Header>
            <Modal.Body>
              <p className="text-slate-400 font-poppins text-sm">
                Tem certeza de que deseja excluir esta{' '}
                <strong>oportunidade</strong>? Esta ação é irreversível e a
                <strong> oportunidade</strong> será permanentemente removido da
                plataforma.
              </p>

              <p className="mt-2 text-slate-700 font-poppins text-sm">
                <strong> nome oportunidade:</strong>
                {body?.title}
                <br />
                <strong> valor:</strong> R${body?.amount}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Modal.Action onClick={onClose}>Cancelar</Modal.Action>
              <Modal.Action
                isLoading={isDeleteLoading}
                onClick={onDeleteOpportunity}
                actions="dangerous"
              >
                Deletar oportunidade
              </Modal.Action>
            </Modal.Footer>
          </>
        )}

        {type === 'PENDING' && (
          <>
            <Modal.Header onClose={onClose}>
              <div className="flex items-center gap-2">
                <div className="p-1 bg-green-100 rounded-lg text-green-600">
                  <FiXCircle size={18} />
                </div>
                <h4 className="font-inter text-xl font-medium text-green-600">
                  Voce deseja finalizar
                </h4>
              </div>
            </Modal.Header>
            <Modal.Body>
              <p className="text-slate-400 font-poppins text-sm">
                Tem certeza de que concluir a oportunidade?
              </p>
              <p className="text-slate-400 font-poppins text-sm">
                Ao finalizar a oportunidade não é possível reabri-la
              </p>

              <p className="mt-2 text-slate-700 font-poppins text-sm">
                <strong> nome oportunidade:</strong>
                {body?.title}
                <br />
                <strong> valor:</strong> R${body?.amount}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Modal.Action onClick={onClose}>Cancelar</Modal.Action>
              <Modal.Action
                isLoading={isFinishedLoading}
                onClick={() =>
                  onFinishedOpportunity({
                    opportunityId: body?.id || '',
                    status: 'CLOSED',
                  })
                }
                actions="success"
              >
                Concluir oportunidade
              </Modal.Action>
            </Modal.Footer>
          </>
        )}
      </Modal.Container>
    </Modal.Overlay>
  )
}
