'use client'

import Link from 'next/link'
import { FiBriefcase, FiEdit2, FiUsers, FiX, FiXCircle } from 'react-icons/fi'

import { Modal } from '@/components/Modal'
import { useModal } from '@/hooks/useModal'
import { Drawer } from '@/components/Drawer'
import { useDrawer } from '@/contexts/useDrawer'

export default function Opportunities() {
  const {
    handleAnimationEndClose,
    handleCloseModal,
    handleOpenModal,
    isLeave,
    isOpen,
  } = useModal()

  const { isOpen: isDrawerOpen, onClose, onOpen } = useDrawer()
  return (
    <div className="w-full">
      <section className="flex items-center justify-between border-b-2 border-slate-200 pb-6">
        <div className="max-w-304">
          <h1 className="font-lato text-xl text-slate-900 font-bold mb-2">
            Minhas oportunidades
          </h1>
          <p className="font-poppins text-slate-400 text-sm">
            confira todas suas oportunidades quem ainda estão em aberto
          </p>
        </div>

        <Link
          href="/dashboard/opportunities/create"
          className=" max-w-304 px-8 py-2 bg-blue-700 text-slate-50 font-poppins font-medium rounded-lg transition-colors hover:bg-blue-600"
        >
          Criar oportunidade
        </Link>
      </section>

      <div className="mt-6">
        <ul className="[&>*:not(:first-child)]:mt-3">
          <li className="flex border-2 justify-between items-center border-slate-200 rounded-lg p-3">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-slate-100 rounded-full">
                <FiBriefcase size="32" color="#334155" />
              </div>

              <div className="flex flex-col">
                <h4 className="font-medium font-poppins text-slate-900 text-base">
                  Faxineira
                </h4>
                <span className="font-semibold font-poppins text-slate-900 text-base">
                  R$ 2000.00
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={onOpen}
                className="hover:scale-105  hover:bg-blue-100 hover:border-blue-200 transition-all p-2 border text-blue-700 border-slate-200 rounded-lg"
              >
                <FiUsers size={24} />
              </button>
              <Link
                href="opportunities/edit/sadasd"
                className="hover:scale-105 hover:bg-green-100 hover:border-green-200 transition-all p-2 border text-green-700 border-slate-200 rounded-lg"
              >
                <FiEdit2 size={24} />
              </Link>

              <button
                onClick={handleOpenModal}
                className="hover:scale-105 hover:bg-red-100 hover:border-red-200 transition-all p-2 border text-red-700 border-slate-200 rounded-lg"
              >
                <FiX size={24} />
              </button>
            </div>
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
              <strong> nome oportunidade:</strong> Faxineira
              <br />
              <strong> valor:</strong> R$155.00
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Modal.Action onClick={handleCloseModal}>Cancelar</Modal.Action>
            <Modal.Action actions="dangerous">
              Deletar oportunidade
            </Modal.Action>
          </Modal.Footer>
        </Modal.Container>
      </Modal.Overlay>

      <Drawer.Provider isOpen={isDrawerOpen} onClose={onClose}>
        <Drawer.Overlay>
          <Drawer.Container>SDA</Drawer.Container>
        </Drawer.Overlay>
      </Drawer.Provider>
    </div>
  )
}
