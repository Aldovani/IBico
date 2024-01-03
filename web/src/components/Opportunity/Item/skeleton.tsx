import { Skeleton } from '@/components/skeleton'

export function OpportunityItemSkeleton() {
  return (
    <div className="border border-slate-200 rounded-2xl py-5 px-4">
      <Skeleton className="h-5 w-32" />
      <Skeleton className="h-3 w-14 mt-2" />

      <div className="flex gap-2 mt-4 flex-col">
        <Skeleton className="h-[10px] w-full" />
        <Skeleton className="h-[10px] w-full " />
        <Skeleton className="h-[10px] w-[80%] " />
      </div>

      <Skeleton className="h-[10px] w-24 mt-5 " />
      <Skeleton className="h-[10px] w-20 mt-4 " />
    </div>
  )
}
