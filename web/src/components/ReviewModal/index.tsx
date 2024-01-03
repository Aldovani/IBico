'use client'
import { useReviewModal } from '@/contexts/reviewModalContext'
import { Modal } from '../Modal'
import { FiAward, FiFrown, FiMeh, FiSmile } from 'react-icons/fi'
import { Input } from '../Input'

export function ReviewModal() {
  const { handleAnimationEndClose, handleClose, isLeave, isOpen, isMounted } =
    useReviewModal()

  return (
    <Modal.Overlay isOpen={isOpen} onClose={handleClose}>
      <Modal.Container
        isMounted={isMounted}
        isLeave={isLeave}
        isOpen={isOpen}
        onAnimationEnd={handleAnimationEndClose}
      >
        <Modal.Header onClose={handleClose}>
          <div className="flex items-center gap-1">
            <div className="p-1 bg-blue-900 rounded-lg text-blue-900">
              <FiAward size={18} />
            </div>
            <h3 className="font-inter text-xl font-medium text-blue-900">
              Avaliar oportunidade
            </h3>
          </div>
        </Modal.Header>
        <Modal.Body>
          <p className="font-poppins text-slate-400 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto
            illum veniam maiores neque aperiam accusantium
          </p>
          <div className="flex mt-6 mb-4 w-auto justify-evenly items-center text-slate-400 ">
            <label className="group cursor-pointer  flex flex-col items-center">
              <input
                type="radio"
                name="review"
                id="bad"
                className="peer w-0 h-0"
              />
              <FiFrown
                size={48}
                className="group-hover:text-rose-500  peer-checked:text-rose-500  transition-colors"
              />
              <span className="group-hover:text-rose-500  peer-checked:text-rose-500 transition-colors">
                Péssimo
              </span>
            </label>

            <label className=" group flex flex-col items-center  cursor-pointer">
              <input
                type="radio"
                name="review"
                id="average"
                className="peer w-0 h-0"
              />
              <FiMeh
                size={48}
                className="group-hover:text-yellow-500 peer-checked:text-yellow-500 transition-colors"
              />
              <span className="group-hover:text-yellow-500 peer-checked:text-yellow-5''00 transition-colors">
                Mediano
              </span>
            </label>

            <label
              className=" group flex flex-col items-center  cursor-pointer"
              htmlFor="great"
            >
              <input
                className="peer w-0 h-0"
                type="radio"
                name="review"
                id="great"
              />
              <FiSmile
                size={48}
                className="group-hover:text-green-500 transition-colors peer-checked:text-green-500"
              />
              <span className="group-hover:text-green-500  transition-colors peer-checked:text-green-500">
                Ótimo
              </span>
            </label>
          </div>

          <Input.Label id="message" name="Mensagem">
            <Input.TextArea />
          </Input.Label>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Action>Cancelar</Modal.Action>
          <Modal.Action actions="success">Confirmar</Modal.Action>
        </Modal.Footer>
      </Modal.Container>
    </Modal.Overlay>
  )
}
