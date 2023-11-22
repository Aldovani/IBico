'use client'

import { Modal } from '../Modal'
import { FiCheck } from 'react-icons/fi'
import { Button } from '../Button'
import { useConfirmCandidature } from './useConfirmCandidature'
type ConfirmCandidatureProps = {
  opportunityId: string
}

export function ConfirmCandidature({ opportunityId }: ConfirmCandidatureProps) {
  const {
    handleAnimationEndClose,
    handleClose,
    handleOpen,
    isLeave,
    isMounted,
    isOpen,
    handleSubmitCandidature,
    isLoading,
  } = useConfirmCandidature()
  return (
    <>
      <Button onClick={handleOpen} className="flex-grow-1">
        Candidata-se
      </Button>
      <Modal.Overlay isOpen={isOpen} onClose={handleClose}>
        <Modal.Container
          isLeave={isLeave}
          isOpen={isOpen}
          isMounted={isMounted}
          onAnimationEnd={handleAnimationEndClose}
        >
          <Modal.Header onClose={handleClose}>
            <div className="flex items-center gap-1">
              <div className="p-1 bg-blue-100 rounded-lg text-blue-700">
                <FiCheck size={18} />
              </div>
              <h3 className="font-inter text-lg font-semibold">
                Confirmar candidatura
              </h3>
            </div>
          </Modal.Header>

          <Modal.Body>
            <p className="font-poppins text-slate-400 text-sm font-normal mb-4">
              Tem certeza de que deseja confirmar sua candidatura para esta
              oportunidade?
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Modal.Action onClick={handleClose}>Cancelar</Modal.Action>
            <Modal.Action
              onClick={() => handleSubmitCandidature(opportunityId)}
              isLoading={isLoading}
              actions="success"
            >
              Confirmar
            </Modal.Action>
          </Modal.Footer>
        </Modal.Container>
      </Modal.Overlay>
    </>
  )
}
