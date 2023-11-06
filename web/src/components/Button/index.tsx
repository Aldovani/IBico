import { tv, VariantProps } from 'tailwind-variants'
import { ComponentProps, ReactNode } from 'react'
import { Spinner } from '../Spinner'

const button = tv({
  base: 'font-poppins font-medium whitespace-nowrap flex  items-center rounded-lg  justify-center w-full  py-2 px-6   duration-150 ease-out ',
  variants: {
    variants: {
      primary:
        'text-lg  hover:bg-blue-600  bg-blue-700 text-slate-50 disable:border-2 disable:bg-blue-800 disable:cursor-not-allowed  disable:hover:bg-blue-800',
      secondary:
        'border-2 border-slate-300 bg-transparent text-slate-500 hover:bg-slate-200',
    },
    action: {
      dangerous: 'border-red-500 text-red-500 bg-slate-50 hover:bg-red-50 ',
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
  action,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={button({ className, variants, sizes, action })}
    >
      {loading && <Spinner />}
      {!loading && children}
    </button>
  )
}
