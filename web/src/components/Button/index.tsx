import { tv, VariantProps } from 'tailwind-variants'
import { ComponentProps, ReactNode } from 'react'
import { Spinner } from '../Spinner'

const button = tv({
  base: 'font-poppins font-medium whitespace-nowrap flex  items-center rounded-lg  justify-center w-full  py-2 px-6   duration-150 ease-out ',
  variants: {
    variants: {
      primary:
        '  hover:bg-blue-900/90  bg-blue-900 text-slate-50  disabled:bg-blue-900 disabled:opacity-60 disabled:cursor-not-allowed  disabled:hover:bg-blue-900/90',
      secondary:
        'border border-slate-300 bg-transparent text-slate-500 hover:bg-slate-200',
    },
    action: {
      dangerous: 'border-rose-600 text-rose-600 bg-slate-50 hover:bg-rose-50 ',
    },
    sizes: {
      small: 'text-sm',
      normal: 'text-base',
      big: 'text-lg',
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
  sizes = 'normal',
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
