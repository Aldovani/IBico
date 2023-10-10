import { ComponentProps, Ref, forwardRef } from 'react'

import { tv, VariantProps } from 'tailwind-variants'

const pin = tv({
  base: 'w-full  min-w-16 h-16 p-4 text-xl text-center block text-slate-900 font-poppins border-2 rounded-s rounded-e border-slate-200 bg-slate-100 focus:text-blue-700 focus:border-blue-700 outline-none focus:placeholder:text-blue-700',
  variants: {
    error: { true: '' },
    success: { true: '' },
  },
})

type InputPinProps = ComponentProps<'input'> & VariantProps<typeof pin>

export const Pin = forwardRef(function (
  { error, success, ...props }: InputPinProps,
  ref: Ref<HTMLInputElement> | null,
) {
  return (
    <input
      ref={ref}
      maxLength={1}
      {...props}
      className={pin({ error, success })}
    />
  )
})

Pin.displayName = 'Pin'
