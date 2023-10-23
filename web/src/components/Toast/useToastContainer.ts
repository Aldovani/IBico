import { toastEventManager } from '@/utils/toast'
import { useCallback, useEffect, useState } from 'react'

type Toast = {
  type: 'SUCCESS' | 'ERROR' | 'WARNING'
  text: string
  title: string
  id: number
}

export function useToastContainer() {
  const [toasts, setToast] = useState<Toast[]>([])

  const handleAddNewToast = useCallback(({ text, title, type }: Toast) => {
    setToast((prev) => [
      ...prev,
      {
        text,
        title,
        type,
        id: Math.random(),
      },
    ])
  }, [])

  function removeToast(id: number) {
    setToast((prev) => prev.filter((item) => item.id !== id))
  }

  useEffect(() => {
    toastEventManager.on('addtoast', handleAddNewToast)

    return () => toastEventManager.removeListener('addtoast', handleAddNewToast)
  }, [handleAddNewToast])

  return {
    removeToast,
    toasts,
  }
}
