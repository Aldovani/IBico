export function Spinner() {
  return (
    <div className="relative">
      <span className="block animate-spin  top-0 left-0 w-6 h-6    border-t-transparent rounded-full border-4 border-slate-200"></span>
      <span className="block top-0 opacity-50 absolute w-6 h-6 rounded-full border-4 border-slate-200 "></span>
    </div>
  )
}
