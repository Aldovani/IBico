import { ReactNode } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const labelText = tv({
  base: 'text-slate-600 font-poppins   data-[error=true]:text-rose-500',
  variants: {
    error: {
      true: 'text-rose-500',
    },
  },
})

type LabelProps = {
  id: string
  name?: string
  children: ReactNode
  className?: string
} & VariantProps<typeof labelText>

export function Label({ error, id, children, name, className }: LabelProps) {
  return (
    <label htmlFor={id} className={`flex flex-col ${className}`}>
      {name && <span className={`${labelText({ error })}  mb-2`}>{name}</span>}
      {children}
    </label>
  )
}
