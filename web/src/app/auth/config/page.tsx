'use client'

import Link from 'next/link'

import { Button } from '@/components/Button'

import { useConfig } from './useConfig'
import { Skills } from '@/components/Skills'

export default function Register() {
  const { skills, handleAddSkill, handleSubmit, removeSkill, isLoading } =
    useConfig()

  return (
    <div className=" pb-10 max-w-lg w-full max-md:m-auto max-sm:px-6">
      <header className="mt-8">
        <h2 className="font-lato text-slate-900 text-3xl font-semibold">
          Configuração da sua conta
        </h2>
        <p className="font-poppins text-slate-400  mt-2">
          Insira suas principais competências para que outros usuários possam
          contratar seus serviços
        </p>
      </header>
      <form className="flex flex-col mt-8" onSubmit={handleSubmit}>
        <Skills
          onAddSkill={handleAddSkill}
          onRemoveSkill={removeSkill}
          skills={skills}
        />

        <div className="flex items-center justify-between ">
          <Link
            href="/opportunities"
            className="font-poppins font-semibold text-slate-500 mt-4"
          >
            pular
          </Link>
          <Button loading={isLoading} className="mt-5 w-52" type="submit">
            Finalizar
          </Button>
        </div>
      </form>
    </div>
  )
}
