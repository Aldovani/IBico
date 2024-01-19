import { SimilarOpportunitiesSkeleton } from '@/components/Opportunity/SimilarOpportunities/SimilarOpportunitiesSkeleton'
import { Skeleton } from '@/components/skeleton'

export default function OpportunityLoading() {
  return (
    <div className=" max-w-screen-xl mx-auto pt-28 px-6 pb-24 grid grid-cols-opportunity-details items-start justify-between max-lg:grid-cols-1">
      <div>
        <section className="flex items-center justify-between ">
          <div className="flex-1">
            <Skeleton className=" mt-4 mb-2 h-10 w-80" />

            <Skeleton className="w-96 h-6" />

            <div className="flex items-center gap-6 mt-4">
              <Skeleton className="w-28 h-4" />
              <Skeleton className="w-28 h-4" />
            </div>
          </div>
        </section>

        <section className="flex justify-between gap-4 mt-6 max-md:flex-wrap">
          <Skeleton className="w-full pt-8 pl-4 pb-6  rounded-md h-32"></Skeleton>
          <Skeleton className="w-full pt-8 pl-4 pb-6  rounded-md h-32"></Skeleton>
          <Skeleton className="w-full pt-8 pl-4 pb-6  rounded-md h-32"></Skeleton>
          <Skeleton className="w-full pt-8 pl-4 pb-6  rounded-md h-32"></Skeleton>
        </section>

        <section className="mt-10 ">
          <Skeleton className="w-16 h-3" />

          <div className="mt-4 flex items-center gap-3">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div>
              <Skeleton className="w-20 h-4" />
              <Skeleton className="w-16 mt-2 h-4" />
            </div>
          </div>
        </section>

        <section className="mt-10 ">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-16 mt-2 h-4" />
        </section>

        <section className="mt-10 ">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-16 mt-2 h-4" />
        </section>
      </div>
      <section className="max-w-xs max-lg:max-w-none  w-full max-md:mt-6">
        <Skeleton className="w-32 h-8 mb-5" />
        <SimilarOpportunitiesSkeleton />
      </section>
    </div>
  )
}
