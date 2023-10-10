type checkboxProps = {
  id: string
  description: string
  title: string
}

export function Checkbox({ id, description, title }: checkboxProps) {
  return (
    <div>
      <div className="flex gap-3">
        <input
          id="draft"
          className="peer/draft"
          type="checkbox"
          name="status"
        />
        <label htmlFor="draft" className="peer-checked/draft:text-sky-500">
          <span className="font-lato text-base text-slate-700 font-medium mb-1">
            {title}
          </span>
          <p className="font-poppins text-slate-400 text-sm">{description}</p>
        </label>
      </div>
    </div>
  )
}
