'use client'

import { useRouter } from 'next/navigation'
import { FiArrowLeft } from 'react-icons/fi'

export function LinkBack() {
  const { back } = useRouter()
  return (
    <p
      onClick={back}
      className="flex items-center text-slate-400 gap-1 font-poppins font-medium"
    >
      <FiArrowLeft size={20} /> Voltar
    </p>
  )
}
