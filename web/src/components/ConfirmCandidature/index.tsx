'use client'

import { Modal } from '../Modal'
import { FiCheck } from 'react-icons/fi'
import { Button } from '../Button'
import { useConfirmCandidature } from './useConfirmCandidature'
type ConfirmCandidatureProps = {
  opportunityId: string
  authorUsername: string
  isCandidate: boolean
}

export function ConfirmCandidature({
  opportunityId,
  isCandidate: isAlreadyCandidate,
  authorUsername,
}: ConfirmCandidatureProps) {
  const {
    handleAnimationEndClose,
    handleClose,
    handleOpen,
    isLeave,
    isMounted,
    isOpen,
    handleSubmitCandidature,
    isLoading,
    isAuthor,
    isApply,
  } = useConfirmCandidature({ authorUsername })

  return (
    <>
      {!isAuthor && (
        <Button
          variants="primary"
          onClick={handleOpen}
          disabled={isAlreadyCandidate || isApply}
          className="flex-grow-1"
        >
          {isAlreadyCandidate || isApply ? 'Candidatou-se' : 'Candidatar-se'}
        </Button>
      )}
      <Modal.Overlay isOpen={isOpen} onClose={handleClose}>
        <Modal.Container
          isLeave={isLeave}
          isOpen={isOpen}
          isMounted={isMounted}
          onAnimationEnd={handleAnimationEndClose}
        >
          <Modal.Header onClose={handleClose}>
            <div className="flex items-center gap-1">
              <div className="p-1 bg-blue-900 rounded-lg text-blue-900">
                <FiCheck size={18} />
              </div>
              <h3 className="font-inter text-lg font-medium text-blue-900">
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
