import { ComponentProps, Ref, forwardRef } from 'react'
import { VariantProps, tv } from 'tailwind-variants'
import { Spinner } from '../Spinner'

const field = tv({
  base: 'w-full bg-slate-100 disabled:bg-slate-200/50 disabled:border-slate-300  resize-y min-h-24 font-poppins outline-0 placeholder:text-slate-400 text-slate-700  border-slate-200 border-y border-x  pl-4 rounded-lg py-4  focus:border-blue-900 focus:text-blue-900 focus:bg-blue-900/10',
  variants: {
    error: {
      true: 'bg-rose-50  border-rose-500 text-rose-500 focus:border-rose-500 focus:bg-rose-50 focus:text-rose-500 placeholder:text-rose-400 ',
    },
    sizes: {
      small: 'text-sm  ',
      medium: 'text-base ',
    },
  },
})

type TextAreaProps = ComponentProps<'textarea'> &
  VariantProps<typeof field> & {
    isLoading?: boolean
  }

export const TextArea = forwardRef(function (
  {
    error,
    sizes = 'medium',
    className,
    isLoading = false,
    ...props
  }: TextAreaProps,
  ref: Ref<HTMLTextAreaElement> | null,
) {
  return (
    <div className="relative w-full">
      <textarea
        disabled={isLoading}
        className={field({ error, sizes, className })}
        ref={ref}
        {...props}
      />
      {isLoading && (
        <div className="absolute right-4 top-4 ">
          <Spinner colors="black" />
        </div>
      )}
    </div>
  )
})

TextArea.displayName = 'TextAreaField'
