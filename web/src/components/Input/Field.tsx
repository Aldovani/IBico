import { tv, VariantProps } from 'tailwind-variants'
import { ComponentProps, Ref, forwardRef } from 'react'

const field = tv({
  base: 'w-full bg-slate-100  font-poppins outline-0 placeholder:text-slate-400 text-slate-700  border-slate-200 border-y border-x  pl-4 rounded-lg py-4  focus:border-blue-700 focus:text-blue-700 focus:bg-blue-50',
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

type FieldProps = ComponentProps<'input'> & VariantProps<typeof field>

export const Field = forwardRef(function (
  { error, sizes = 'medium', className, ...props }: FieldProps,
  ref: Ref<HTMLInputElement> | null,
) {
  return (
    <input
      className={field({ error, sizes, className })}
      ref={ref}
      {...props}
    />
  )
})

Field.displayName = 'InputField'
