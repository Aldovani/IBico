'use client'
import { useModal } from '@/hooks/useModal'
import { Modal } from '../Modal'
import { ShareList } from './shareList'
import { Copy } from '../Copy'
import { FiShare2 } from 'react-icons/fi'
type ShareModalProps = {
  url: string
}

export function ShareModal({ url }: ShareModalProps) {
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
        className="flex items-center text-blue-900 hover:text-opacity-60 transition-opacity gap-2 cursor-pointer"
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
            <div className="flex items-center gap-2">
              <div className="p-1 bg-blue-900/10 rounded-lg text-blue-900">
                <FiShare2 size={18} />
              </div>
              <h3 className="font-inter text-xl font-medium text-blue-900">
                Compartilhar
              </h3>
            </div>
          </Modal.Header>

          <Modal.Body>
            <p className="font-poppins text-slate-400 text-sm font-normal mb-4">
              compartilhe essa oportunidades com amigos e familiares que
              precisam de uma renda extra
            </p>
            <Copy text={url} />
            <ShareList url={url} />
          </Modal.Body>
        </Modal.Container>
      </Modal.Overlay>
    </>
  )
}
