'use client'

import { FiTrash } from 'react-icons/fi'

export type Skills = {
  name: string
  id: number
}

type SkillsListProps = {
  skills: Skills[]
  onRemove: (id: number) => void
}

export function SkillsList({ skills, onRemove }: SkillsListProps) {
  return (
    <ul className="flex gap-2 mt-4 flex-wrap max-w-max">
      {skills?.map(({ id, name }) => (
        <li
          key={id}
          className="border-x border-y relative capitalize text-slate-500 font-poppins text-sm border-slate-200 rounded-lg bg-slate-100 p-2 group"
        >
          {name}
          <button
            type="button"
            onClick={() => onRemove(id)}
            className=" p-1 opacity-0 rounded-full top-0 right-0 hover:bg-red-500 hover:text-slate-50 transition-all translate-x-1/2 -translate-y-1/2 absolute border-x border-y border-slate-200 bg-slate-50 group-hover:opacity-100"
          >
            <FiTrash size={12} />
          </button>
        </li>
      ))}
    </ul>
  )
}
