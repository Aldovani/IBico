'use client'

import { Modal } from '@/components/Modal'
import { useModal } from '@/hooks/useModal'
import Link from 'next/link'
import { FiUser, FiX, FiXCircle } from 'react-icons/fi'

export default function Applications() {
  const {
    handleAnimationEndClose,
    handleCloseModal,
    handleOpenModal,
    isLeave,
    isOpen,
  } = useModal()

  return (
    <div className="w-full">
      <section className="flex items-center justify-between border-b-2 border-slate-200 pb-6">
        <div className="max-w-304">
          <h1 className="font-lato text-xl text-slate-900 font-bold mb-2">
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
          <li className="flex border-2 justify-between items-center border-slate-200 rounded-lg p-3">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-slate-100 rounded-full">
                <FiUser size="32" color="#334155" />
              </div>

              <div className="flex flex-col">
                <h4 className="font-medium font-poppins text-slate-900 text-base">
                  Faxineira
                </h4>
                <span className="text-xs font-poppins text-slate-400">
                  por{' '}
                  <Link href="" className="text-blue-700">
                    Luize Santos da silva{' '}
                  </Link>
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-poppins text-slate-500">20/09/2023</span>
                <span className="font-semibold font-poppins text-slate-900 text-base">
                  R$ 2000.00
                </span>
              </div>
            </div>

            <button
              onClick={handleOpenModal}
              className="hover:scale-105 hover:bg-red-100 hover:border-red-200 transition-all p-2 border text-red-700 border-slate-200 rounded-lg"
            >
              <FiX size={24} />
            </button>
          </li>
        </ul>
      </div>

      <Modal.Overlay isOpen={isOpen} onClose={handleCloseModal}>
        <Modal.Container
          onAnimationEnd={handleAnimationEndClose}
          isLeave={isLeave}
          isOpen={isOpen}
        >
          <Modal.Header onClose={handleCloseModal}>
            <div className="flex items-center gap-2">
              <div className="p-1 bg-red-100 rounded-lg text-red-700">
                <FiXCircle size={18} />
              </div>
              <h4 className="font-lato text-2xl font-semibold">
                Voce deseja desistir
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
              <strong>titulo oportunidade:</strong> Faxineira
              <br />
              <strong> valor:</strong> R$155.00
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Modal.Action onClick={handleCloseModal}>Cancelar</Modal.Action>
            <Modal.Action actions="dangerous">
              Desistir da oportunidade
            </Modal.Action>
          </Modal.Footer>
        </Modal.Container>
      </Modal.Overlay>
    </div>
  )
}
