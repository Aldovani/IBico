import { ComponentProps } from 'react'
import { tv } from 'tailwind-variants'

type SkeletonProps = ComponentProps<'div'>

const skeleton = tv({
  base: ' before:absolute before:inset-0 before:-translate-x-full before:bg-shimmer before:animate-shimmer relative overflow-hidden rounded-md  bg-slate-200 ',
})

export function Skeleton({ className, ...rets }: SkeletonProps) {
  return <div {...rets} className={skeleton({ className })}></div>
}
