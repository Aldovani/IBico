'use client'

import { Modal } from '../Modal'
import { FiXCircle } from 'react-icons/fi'
import { AnimationEvent } from 'react'

type ModalBody = {
  title: string
  id: string
  value: number
}

type ModalOpportunity = {
  isLeave: boolean
  isOpen: boolean
  isMounted: boolean
  isDeleteLoading: boolean
  onDeleteOpportunity: () => void
  onClose: () => void
  body: ModalBody | undefined
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
}: ModalOpportunity) {
  return (
    <Modal.Overlay isOpen={isOpen} onClose={onClose}>
      <Modal.Container
        isMounted={isMounted}
        onAnimationEnd={onAnimationEndClose}
        isLeave={isLeave}
        isOpen={isOpen}
      >
        <Modal.Header onClose={onClose}>
          <div className="flex items-center gap-2">
            <div className="p-1 bg-red-100 rounded-lg text-red-700">
              <FiXCircle size={18} />
            </div>
            <h4 className="font-inter text-2xl font-semibold">
              Voce deseja excluir
            </h4>
          </div>
        </Modal.Header>
        <Modal.Body>
          <p className="text-slate-400 font-poppins text-sm">
            Tem certeza de que deseja excluir esta <strong>oportunidade</strong>
            ? Esta ação é irreversível e a<strong> oportunidade</strong> será
            permanentemente removido da plataforma.
          </p>

          <p className="mt-2 text-slate-700 font-poppins text-sm">
            <strong> nome oportunidade:</strong>
            {body?.title}
            <br />
            <strong> valor:</strong> R${body?.value}
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
      </Modal.Container>
    </Modal.Overlay>
  )
}
