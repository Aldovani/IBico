import { ComponentProps, Ref, forwardRef } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const field = tv({
  base: 'w-full bg-slate-100 resize-y min-h-24 font-poppins outline-0 placeholder:text-slate-400 text-slate-700  border-slate-200 border-y border-x  pl-4 rounded-lg py-4  focus:border-blue-700 focus:text-blue-700 focus:bg-blue-50',
  variants: {
    error: {
      true: 'bg-red-50  border-red-500 text-red-500 focus:border-red-500 focus:bg-red-50 focus:text-red-500 placeholder:text-red-400 ',
    },
    sizes: {
      small: 'text-sm  ',
      medium: 'text-base ',
    },
  },
})

type TextAreaProps = ComponentProps<'textarea'> & VariantProps<typeof field>

export const TextArea = forwardRef(function (
  { error, sizes = 'medium', className, ...props }: TextAreaProps,
  ref: Ref<HTMLTextAreaElement> | null,
) {
  return (
    <textarea
      className={field({ error, sizes, className })}
      ref={ref}
      {...props}
    />
  )
})

TextArea.displayName = 'TextAreaField'
