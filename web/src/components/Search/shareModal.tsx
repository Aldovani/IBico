'use client'
import { useModal } from '@/hooks/useModal'
import { Modal } from '../Modal'
import { ShareList } from './shareList'
import { Copy } from '../Copy'
import { FiShare2 } from 'react-icons/fi'

export function ShareModal() {
  const {
    handleAnimationEndClose,
    handleClose,
    handleOpen,
    isLeave,
    isMounted,
    isOpen,
  } = useModal()

  return (
    <>
      <span
        className="flex items-center text-blue-700 gap-2"
        onClick={handleOpen}
      >
        compartilhar
        <FiShare2 />
      </span>
      <Modal.Overlay isOpen={isOpen} onClose={handleClose}>
        <Modal.Container
          isLeave={isLeave}
          isMounted={isMounted}
          isOpen={isOpen}
          onAnimationEnd={handleAnimationEndClose}
        >
          <Modal.Header onClose={handleClose}>
            <div className="flex items-center gap-1">
              <div className="p-1 bg-blue-100 rounded-lg text-blue-700">
                <FiShare2 size={18} />
              </div>
              <h3 className="font-inter text-lg font-semibold">Compartilhar</h3>
            </div>
          </Modal.Header>

          <Modal.Body>
            <p className="font-poppins text-slate-400 text-sm font-normal mb-4">
              compartilhe essa oportunidades com amigos e familiares que
              precisam de uma renda extra
            </p>
            <Copy text="htpps://ibico.com/opportunities/54565411sdadasdasdasdaskdajskldjasdkjal" />
            <ShareList url="sdasdn" />
          </Modal.Body>
        </Modal.Container>
      </Modal.Overlay>
    </>
  )
}
