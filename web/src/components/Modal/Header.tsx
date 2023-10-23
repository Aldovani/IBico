import { ReactNode } from 'react'
import { FiX } from 'react-icons/fi'
type HeaderProps = {
  children: ReactNode
  onClose: () => void
}

export function Header({ children, onClose }: HeaderProps) {
  return (
    <header className="border-b pb-2 border-slate-200 w-full flex items-center justify-between">
      {children}

      <button
        onClick={onClose}
        className="border-x text-slate-400 border-y border-slate-200 p-1 rounded-lg transition-all bg-slate-50  hover:scale-105 hover:text-red-700"
      >
        <FiX size={20} />
      </button>
    </header>
  )
}
