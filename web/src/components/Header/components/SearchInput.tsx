'use client'
import { Input } from '@/components/Input'
import { FiSearch } from 'react-icons/fi'

export function SearchInput() {
  return (
    <Input.Label id="search" className="max-w-lg flex-1 max-md:hidden">
      <Input.Field
        sizes="small"
        className="pl-9"
        placeholder="Pesquise pelo titulo da vaga ou pelo nome de usuário"
      >
        <Input.Icon
          positions="left"
          icon={<FiSearch className="text-blue-900" size={14} />}
        />
      </Input.Field>
    </Input.Label>
  )
}
