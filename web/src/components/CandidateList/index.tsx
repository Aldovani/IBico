'use client'
import { CandidateItem } from './candidateItem'
import { Pagination } from '../Pagination'
import { useCandidateList } from './useCandidateList'
import { Skeleton } from '../skeleton'

type CandidateListProps = {
  opportunityId: string
}

export function CandidateList({ opportunityId }: CandidateListProps) {
  const data = useCandidateList({ opportunityId })

  if (!data) return null

  const {
    candidates,
    currentPage,
    handleChangePage,
    isLoading,
    totalCandidates,
    totalPages,
    isEmpty,
    handleSelectCandidate,
    isSelectCandidateLoading,
  } = data

  return (
    <div className="mt-8">
      {!isLoading && !isEmpty && (
        <span className="font-medium text-slate-500 text-xl">
          candidatos{' '}
          <strong>({totalCandidates.toString().padStart(2, '0')})</strong>
        </span>
      )}
      <ul className="flex mt-6 items-center justify-between gap-6 flex-wrap">
        {!isLoading &&
          candidates.map((candidate) => (
            <CandidateItem
              handleSelectCandidate={() =>
                handleSelectCandidate({
                  opportunityId,
                  userId: candidate.id,
                })
              }
              isSelectCandidateLoading={isSelectCandidateLoading}
              key={candidate.id}
              candidate={candidate}
            />
          ))}

        {isLoading && (
          <>
            <div className="p-6 border w-[252px] flex flex-col items-center border-slate-200 rounded-lg bg-slate-50 shadow-card">
              <Skeleton className="rounded-full w-20 h-20" />
              <Skeleton className=" w-4/6 mt-2 h-6" />
              <Skeleton className=" w-full h-8 mt-4" />
              <Skeleton className=" w-full h-8 mt-2" />
            </div>
            <div className="p-6 border w-[252px] flex flex-col items-center border-slate-200 rounded-lg bg-slate-50 shadow-card">
              <Skeleton className="rounded-full w-20 h-20" />
              <Skeleton className=" w-4/6 mt-2 h-6" />
              <Skeleton className=" w-full h-8 mt-4" />
              <Skeleton className=" w-full h-8 mt-2" />
            </div>
            <div className="p-6 border w-[252px] flex flex-col items-center border-slate-200 rounded-lg bg-slate-50 shadow-card">
              <Skeleton className="rounded-full w-20 h-20" />
              <Skeleton className=" w-4/6 mt-2 h-6" />
              <Skeleton className=" w-full h-8 mt-4" />
              <Skeleton className=" w-full h-8 mt-2" />
            </div>
            <div className="p-6 border w-[252px] flex flex-col items-center border-slate-200 rounded-lg bg-slate-50 shadow-card">
              <Skeleton className="rounded-full w-20 h-20" />
              <Skeleton className=" w-4/6 mt-2 h-6" />
              <Skeleton className=" w-full h-8 mt-4" />
              <Skeleton className=" w-full h-8 mt-2" />
            </div>
          </>
        )}

        {!isLoading && isEmpty && (
          <div className="mt-6 flex flex-col items-center justify-center w-full">
            <div className="flex items-center justify-center relative w-full">
              <div className="rotate-[-8deg] translate-x-[110px] p-6 border w-[252px] flex flex-col items-center border-slate-200 rounded-lg bg-slate-50 shadow-card">
                <Skeleton className="rounded-full w-20 h-20" />
                <Skeleton className=" w-4/6 mt-2 h-6" />
                <Skeleton className=" w-full h-8 mt-4" />
                <Skeleton className=" w-full h-8 mt-2" />
              </div>
              <div className="p-6 relative z-10  border w-[252px] flex flex-col items-center border-slate-200 rounded-lg bg-slate-50 shadow-card">
                <Skeleton className="rounded-full w-20 h-20" />
                <Skeleton className=" w-4/6 mt-2 h-6" />
                <Skeleton className=" w-full h-8 mt-4" />
                <Skeleton className=" w-full h-8 mt-2" />
              </div>
              <div className="rotate-[8deg] -translate-x-[110px] p-6 border w-[252px] flex flex-col items-center border-slate-200 rounded-lg bg-slate-50 shadow-card">
                <Skeleton className="rounded-full w-20 h-20" />
                <Skeleton className=" w-4/6 mt-2 h-6" />
                <Skeleton className=" w-full h-8 mt-4" />
                <Skeleton className=" w-full h-8 mt-2" />
              </div>
            </div>

            <div className="mt-10 flex  flex-col items-center">
              <h2 className="text-blue-900 text-2xl font-inter font-medium">
                a oportunidade ainda não possui nenhum candidato
              </h2>
              <p className="max-w-lg font-poppins text-slate-400 text-center">
                Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class{' '}
              </p>
            </div>
          </div>
        )}
      </ul>
      {!isLoading && !isEmpty && (
        <Pagination
          pageSize={10}
          totalPages={totalPages}
          onChangePage={handleChangePage}
          totalElements={candidates.length}
          currentPage={currentPage}
        />
      )}
    </div>
  )
}
