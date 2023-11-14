import { tv, VariantProps } from 'tailwind-variants'
import { ComponentProps, ReactNode, Ref, forwardRef } from 'react'
import { Spinner } from '../Spinner'

const field = tv({
  base: 'w-full bg-slate-100 disabled:bg-slate-200/50 disabled:border-slate-300   pr-4 font-poppins outline-0 pr-4 placeholder:text-slate-400 text-slate-700  border-slate-200 border-y border-x  pl-4 rounded-lg py-4  focus:border-blue-700 focus:text-blue-700 focus:bg-blue-50',
  variants: {
    error: {
      true: 'bg-red-50  border-red-500 text-red-500 focus:border-red-500 focus:bg-red-50 focus:text-red-500 placeholder:text-red-400 ',
    },
    sizes: {
      small: 'text-sm  h-10',
      medium: 'text-base h-12',
    },
  },
})

type FieldProps = ComponentProps<'input'> &
  VariantProps<typeof field> & {
    isLoading?: boolean
    children?: ReactNode
  }

export const Field = forwardRef(function (
  {
    error,
    sizes = 'medium',
    className,
    children,
    isLoading = false,
    ...props
  }: FieldProps,
  ref: Ref<HTMLInputElement> | null,
) {
  return (
    <div className="relative w-full">
      <input
        disabled={isLoading}
        className={field({ error, sizes, className })}
        ref={ref}
        {...props}
      />

      {children}
      {isLoading && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <Spinner colors="black" />
        </div>
      )}
    </div>
  )
})

Field.displayName = 'InputField'
