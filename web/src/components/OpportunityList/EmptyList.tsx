import Link from 'next/link'
import { Skeleton } from '../skeleton'

export function OpportunityListEmpty() {
  return (
    <section className="flex flex-col items-center justify-center">
      <div className="flex items-center flex-col relative w-full">
        <div className="bg-slate-50 shadow-card w-full scale-[0.9] max-w-lg flex justify-between items-center p-3 border border-slate-200 rounded-2xl">
          <div className="flex gap-4 items-center">
            <Skeleton className="h-14 w-14 rounded-full   before:animate-none" />

            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-24 before:animate-none" />
              <Skeleton className="h-4 w-20 before:animate-none " />
            </div>
          </div>
          <Skeleton className="h-10 w-28 before:animate-none" />
        </div>
        <div className="absolute top-7 w-full bg-slate-50 scale-[0.95] shadow-card max-w-lg flex justify-between items-center p-3 border border-slate-200 rounded-2xl">
          <div className="flex gap-4 items-center">
            <Skeleton className="h-14 w-14 rounded-full animate-none   before:animate-none" />

            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-24   before:animate-none" />
              <Skeleton className="h-4 w-20   before:animate-none" />
            </div>
          </div>
          <Skeleton className="h-10 w-28    before:animate-none" />
        </div>

        <div className="absolute top-14  w-full bg-slate-50 shadow-card  max-w-lg flex justify-between items-center p-3 border border-slate-200 rounded-2xl">
          <div className="flex gap-4 items-center">
            <Skeleton className="h-14 w-14 rounded-full before:animate-none" />

            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-24 before:animate-none" />
              <Skeleton className="h-4 w-20 before:animate-none" />
            </div>
          </div>
          <Skeleton className="h-10 w-28 before:animate-none" />
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-blue-900 text-2xl font-inter font-medium">
          Voce ainda não possui nenhuma oportunidade
        </h2>
        <p className="max-w-lg font-poppins text-slate-400 text-center">
          Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis. Class{' '}
        </p>

        <Link
          href="/dashboard/opportunities/create"
          className="
  font-poppins font-medium whitespace-nowrap flex  mt-3 items-center rounded-lg  justify-center w-full  py-2 px-6   duration-150 ease-out 
       bg-blue-900 text-slate-50 hover:bg-blue-900/90 transition-all 
        "
        >
          Criar uma oportunidade
        </Link>
      </div>
    </section>
  )
}
