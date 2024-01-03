export function ProfileSkeleton() {
  return (
    <div>
      <main>
        <header className="flex gap-10   items-center">
          <div className="w-32 h-32 bg-slate-300 rounded-full animate-skeleton" />

          <div className="w-full">
            <div className=" rounded-xl bg-slate-300 w-full h-12 animate-skeleton "></div>
            <div className=" mt-3 rounded-xl bg-slate-300 w-1/2 h-6 animate-skeleton"></div>
            <div className="flex items-center gap-6 mt-2">
              <div className=" rounded-xl bg-slate-300 w-20 h-6 animate-skeleton"></div>
              <div className=" rounded-xl bg-slate-300 w-20 h-6 animate-skeleton "></div>
            </div>
          </div>
        </header>

        <div className="flex w-full mt-8 mb-8  gap-4 justify-between">
          <div className=" rounded-xl bg-slate-300 flex-1 h-36 animate-skeleton mt-2"></div>

          <div className=" rounded-xl bg-slate-300 flex-1 h-36 animate-skeleton mt-2"></div>

          <div className=" rounded-xl bg-slate-300 flex-1 h-36 animate-skeleton mt-2"></div>
        </div>

        <div className=" rounded-xl bg-slate-300 w-20 h-6 animate-skeleton "></div>

        <div className="w-full flex-wrap mt-3 flex gap-4">
          <div className="w-20 bg-slate-300 animate-skeleton h-7  rounded-xl"></div>
          <div className="w-20 bg-slate-300 animate-skeleton h-7  rounded-xl"></div>
          <div className="w-20 bg-slate-300 animate-skeleton h-7  rounded-xl"></div>
          <div className="w-20 bg-slate-300 animate-skeleton h-7 rounded-xl"></div>
          <div className="w-20 bg-slate-300 animate-skeleton h-7 rounded-xl"></div>
          <div className="w-20 bg-slate-300 animate-skeleton h-7 rounded-xl"></div>
          <div className="w-20 bg-slate-300 animate-skeleton h-7 rounded-xl"></div>
          <div className="w-20 bg-slate-300 animate-skeleton h-7 rounded-xl"></div>
          <div className="w-20 bg-slate-300 animate-skeleton h-7 rounded-xl"></div>
          <div className="w-20 bg-slate-300 animate-skeleton h-7 rounded-xl"></div>
        </div>

        <div className="mt-8 rounded-xl bg-slate-300 w-20 h-6 animate-skeleton "></div>

        <div className="flex w-full flex-col h-14 mt-3">
          <div className=" rounded-xl flex-1 bg-slate-300   animate-skeleton "></div>
        </div>
      </main>
    </div>
  )
}
