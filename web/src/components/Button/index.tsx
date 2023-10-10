import { tv, VariantProps } from 'tailwind-variants'
import { ComponentProps, ReactNode } from 'react'
import { Spinner } from '../Spinner'

const button = tv({
  base: 'font-poppins flex items-center rounded-lg h-10  justify-center h-12 w-full py-3 font-semibold  duration-150 ease-out ',
  variants: {
    variants: {
      primary:
        'text-lg  hover:bg-blue-600  bg-blue-700 text-slate-50 disable:border-2 disable:bg-blue-800  disable:hover:bg-blue-800',
      secondary:
        'border-2 border-slate-300 bg-transparent text-slate-500 hover:bg-slate-200',
    },
    sizes: {
      sm: ' text-sm',
    },
  },
})

export type ButtonProps = {
  children: ReactNode
  loading?: boolean
} & ComponentProps<'button'> &
  VariantProps<typeof button>

export function Button({
  children,
  sizes,
  loading = false,
  className,
  variants = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button {...props} className={button({ className, variants, sizes })}>
      {loading && <Spinner />}
      {!loading && children}
    </button>
  )
}
