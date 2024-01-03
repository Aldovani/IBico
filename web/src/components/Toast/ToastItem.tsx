'use client'
import { FiCheckCircle, FiAlertCircle, FiXCircle, FiX } from 'react-icons/fi'
import { useToastItem } from './useToastItem'

type ToastItemProps = {
  data: {
    title: string
    text: string
    id: number
    type: 'SUCCESS' | 'ERROR' | 'WARNING'
  }
  onClose: (id: number) => void
}

export function ToastItem({ data, onClose }: ToastItemProps) {
  const { handleClose, handleAnimationEnd, isLeaving } = useToastItem({
    id: data.id,
    onClose,
  })

  return (
    <li
      data-toast-type={data.type}
      onAnimationEnd={handleAnimationEnd}
      data-leaving={isLeaving}
      className="flex items-start rounded-lg shadow-modal border bg-slate-50 border-slate-200 p-2 min-h-[80px] w-80 gap-3 data-[leaving='false']:animate-from-right data-[leaving='true']:animate-leave-right"
    >
      {data.type === 'SUCCESS' && (
        <div className="w-6 h-6 p-1 rounded-lg text-green-700 bg-green-100">
          <FiCheckCircle size={16} />
        </div>
      )}

      {data.type === 'ERROR' && (
        <div className="w-6 h-6 p-1 rounded-lg text-rose-700 bg-rose-100">
          <FiXCircle size={16} />
        </div>
      )}
      {data.type === 'WARNING' && (
        <div className="w-6 h-6 p-1 rounded-lg text-yellow-700 bg-yellow-100">
          <FiAlertCircle size={16} />
        </div>
      )}

      <div className="flex-1">
        <div className="flex  justify-between items-center w-full">
          <h4
            data-type={data.type}
            className="font-inter font-semibold text-sm data-[type='ERROR']:text-rose-700 data-[type='SUCCESS']:text-green-700 data-[type='WARNING']:text-yellow-700"
          >
            {data.title}
          </h4>

          <button
            onClick={handleClose}
            className="border border-slate-200 p-1 rounded-lg text-slate-400 transition-colors hover:text-rose-700 hover:border-rose-200"
          >
            <FiX size={12} />
          </button>
        </div>
        <p className="font-poppins text-xs text-gray-400">{data.text}</p>
      </div>
    </li>
  )
}
