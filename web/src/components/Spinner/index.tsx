import { tv, VariantProps } from 'tailwind-variants'

const spinner = tv({
  base: 'block animate-spin  top-0 left-0 w-6 h-6    rounded-full border-4 border-slate-200',
  variants: {
    colors: {
      black: 'border-slate-400 ',
      white: 'border-slate-50',
      blue: 'border-blue-900',
    },
  },
})

type SpinnerProps = VariantProps<typeof spinner>

export function Spinner({ colors }: SpinnerProps) {
  return (
    <div className="relative">
      <span className={`${spinner({ colors })}  border-t-transparent`}></span>
      <span className={`${spinner({ colors })} opacity-50 absolute`}></span>
    </div>
  )
}
