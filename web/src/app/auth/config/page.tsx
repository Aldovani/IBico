'use client'

import Link from 'next/link'
import { Input } from '@components/Input'
import { Button } from '@/components/Button'

export default function Register() {
  return (
    <div className="flex flex-col pb-10 max-w-lg w-full max-md:m-auto max-sm:px-6">
      <header className="mt-8">
        <h2 className="font-lato text-slate-900 text-3xl font-semibold">
          Configuração da sua conta
        </h2>
        <p className="font-poppins text-slate-400  mt-2">
          Insira suas principais competências para que outros usuários possam
          contratar seus serviços
        </p>
      </header>
      <form className="flex flex-col mt-8">
        <Input.Label id="skills" name="Competências">
          <Input.Field
            id="skills"
            placeholder="Digite sua competência"
          ></Input.Field>
        </Input.Label>

        <div className="flex items-center justify-between ">
          <Link
            href="/vagas"
            className="font-poppins font-semibold text-slate-400 mt-4"
          >
            pular
          </Link>
          <Button className="mt-5 w-52" type="submit">
            Finalizar
          </Button>
        </div>
      </form>
    </div>
  )
}
