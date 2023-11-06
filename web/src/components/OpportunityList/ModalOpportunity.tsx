'use client'
import { useOpportunity } from '@/contexts/opportunityContext'
import { Modal } from '../Modal'
import { FiXCircle } from 'react-icons/fi'

export function ModalOpportunity() {
  const {
    isModalLeave,
    isModalOpen,
    handleAnimationEndCloseModal,
    handleCloseModal,
    handleDeleteOpportunity,
    modalContent,
  } = useOpportunity()
  return (
    <Modal.Overlay isOpen={isModalOpen} onClose={handleCloseModal}>
      <Modal.Container
        onAnimationEnd={handleAnimationEndCloseModal}
        isLeave={isModalLeave}
        isOpen={isModalOpen}
      >
        <Modal.Header onClose={handleCloseModal}>
          <div className="flex items-center gap-2">
            <div className="p-1 bg-red-100 rounded-lg text-red-700">
              <FiXCircle size={18} />
            </div>
            <h4 className="font-lato text-2xl font-semibold">
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
            {modalContent?.title}
            <br />
            <strong> valor:</strong> R${modalContent?.value}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Action onClick={handleCloseModal}>Cancelar</Modal.Action>
          <Modal.Action
            // isLoading={isLoadingDelete}\
            onClick={handleDeleteOpportunity}
            actions="dangerous"
          >
            Deletar oportunidade
          </Modal.Action>
        </Modal.Footer>
      </Modal.Container>
    </Modal.Overlay>
  )
}
