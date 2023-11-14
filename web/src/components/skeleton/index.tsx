import { ComponentProps } from 'react'

type SkeletonProps = ComponentProps<'div'>

export function Skeleton({ className, ...rets }: SkeletonProps) {
  return (
    <div
      {...rets}
      className={`w-full rounded-md animate-skeleton ${className}`}
    ></div>
  )
}
