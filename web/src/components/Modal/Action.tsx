import { ReactNode, ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const action = tv({
  base: 'text-slate-500 font-poppins transition-all font-medium py-2 px-4  border border-slate-200 rounded-lg hover:bg-slate-200',
  variants: {
    actions: {
      dangerous:
        'text-red-700  border-red-500 hover:bg-red-500 hover:text-slate-50  ',
      success: 'text-blue-700 hover:bg-blue-700 hover:text-slate-50',
    },
  },
})

type ActionProps = {
  children: ReactNode
} & VariantProps<typeof action> &
  ComponentProps<'button'>

export function Action({
  children,
  onClick: handleClick,
  className,
  actions,
}: ActionProps) {
  return (
    <button onClick={handleClick} className={action({ actions, className })}>
      {children}
    </button>
  )
}
