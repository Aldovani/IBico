type checkboxProps = {
  id: string
  description: string
  title: string
}

export function Checkbox({ id, description, title }: checkboxProps) {
  return (
    <div className="flex items-start gap-4 ">
      <div className="relative w-5 h-5">
        <input
          id={id}
          className="peer w-0 h-0 before:hover:bg-blue-900/90  before:checked:h-2 absolute after:cursor-pointer after:h-5 after:w-5 after:rounded-full after:checked:bg-blue-900 after:checked:border-blue-900 after:bg-slate-100 after:transition-all after:block after:border after:border-slate-200"
          type="checkbox"
          name="status"
        />
        <span className=" w-2 h-2 checked:w-2 bg-slate-50 z-10 absolute block  left-1/2   transition-all  -translate-x-1/2 -translate-y-1/2  top-1/2  scale-0 peer-checked:scale-100  rounded-full  cursor-pointer  pointer-events-none "></span>
      </div>
      <label htmlFor={id}>
        <span className="font-inter text-base  text-blue-900 font-medium mb-1">
          {title}
        </span>
        <p className="font-poppins text-slate-400 text-sm">{description}</p>
      </label>
    </div>
  )
}
