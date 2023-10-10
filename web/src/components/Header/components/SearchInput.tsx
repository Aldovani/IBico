'use client'
import { Input } from '@/components/Input'
import { FiSearch } from 'react-icons/fi'

export function SearchInput() {
  return (
    <Input.Label id="search" className="max-w-lg flex-1 max-md:hidden">
      <Input.Wrapper>
        <Input.Field
          sizes="small"
          className="pl-8"
          placeholder="Pesquise pelo titulo da vaga ou pelo nome de usuário"
        />
        <Input.Icon
          positions="left"
          icon={<FiSearch color="#1D4ED8" size={14} />}
        />
      </Input.Wrapper>
    </Input.Label>
  )
}
