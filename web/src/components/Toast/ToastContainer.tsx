'use client'

import { ToastItem } from './ToastItem'
import { useToastContainer } from './useToastContainer'

export function ToastContainer() {
  const { removeToast, toasts } = useToastContainer()
  return (
    <ul className="fixed flex z-50 bottom-6  right-6 gap-2 flex-col">
      {toasts.map((data) => (
        <ToastItem data={data} onClose={removeToast} key={data.id} />
      ))}
    </ul>
  )
}
