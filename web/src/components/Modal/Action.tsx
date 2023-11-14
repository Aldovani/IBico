import { ReactNode, ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'
import { Spinner } from '../Spinner'

const action = tv({
  base: 'text-slate-500 font-poppins transition-all font-medium py-2 px-4  border border-slate-200 rounded-lg hover:bg-slate-200',
  variants: {
    actions: {
      dangerous:
        'data-[loading="true"]:bg-red-500  text-red-700  border-red-500 hover:bg-red-500 hover:text-slate-50 ',
      success:
        'data-[loading="true"]:bg-blue-700 text-blue-700 hover:bg-blue-700 hover:text-slate-50',
    },
  },
})

type ActionProps = {
  children: ReactNode
  isLoading?: boolean
} & VariantProps<typeof action> &
  ComponentProps<'button'>

export function Action({
  children,
  onClick: handleClick,
  className,
  actions,
  isLoading = false,
}: ActionProps) {
  return (
    <button
      data-loading={isLoading}
      onClick={handleClick}
      className={action({ actions, className })}
    >
      {isLoading && <Spinner />}
      {!isLoading && children}
    </button>
  )
}
