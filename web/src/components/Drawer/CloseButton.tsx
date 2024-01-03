'use client'
import { FiX } from 'react-icons/fi'
import { ComponentProps } from 'react'
import { useDrawerComponent } from './context'

type CloseButtonProps = ComponentProps<'button'>

export function CloseButton({ ...rest }: CloseButtonProps) {
  const { onClose } = useDrawerComponent()

  return (
    <button
      onClick={onClose}
      {...rest}
      className="border-x text-slate-400 border-y border-slate-200 p-1 rounded-lg transition-all bg-slate-50  hover:scale-105 hover:text-rose-700"
    >
      <FiX size={20} />
    </button>
  )
}
