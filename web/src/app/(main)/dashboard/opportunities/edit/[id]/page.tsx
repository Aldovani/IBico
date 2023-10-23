'use client'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Skills } from '@/components/Skills'
import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'

export default function EditOpportunity() {
  return (
    <div className="w-full">
      <Link
        href="/dashboard/opportunities"
        className="flex  -translate-y-full items-center text-slate-500 gap-1 font-poppins font-medium "
      >
        {<FiArrowLeft size={20} />} Voltar
      </Link>

      <h1 className="text-2xl text-slate-900 font-lato font-bold mb-2">
        Publique sua oportunidade
      </h1>
      <p className="max-w-448 font-poppins text-slate-400 ">
        Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
        libero et velit interdum, ac aliquet odio mattis.
      </p>

      <form className="grid grid-cols-2 gap-x-6 gap-y-4 mt-8 max-md:grid-cols-1">
        <Input.Label id="title" name="Titulo">
          <Input.Field placeholder="Digite o titulo da oportunidade" />
        </Input.Label>

        <div className="col-start-2 col-end-3 flex gap-4 max-md:col-auto  max-sm:flex max-sm:flex-col">
          <Input.Label
            id="date-started"
            className="flex-1"
            name="Data de inicio"
          >
            <Input.Field type="date" />
          </Input.Label>

          <Input.Label
            id="date-finished"
            className="flex-1"
            name="Data de termino"
          >
            <Input.Field type="date" />
          </Input.Label>
        </div>

        <Input.Label id="place" name="Local">
          <Input.Field placeholder="Digite o local da oportunidade" />
        </Input.Label>

        <Input.Label id="value" name="valor">
          <Input.Field placeholder="Digite o valor da oportunidade" />
        </Input.Label>

        <Input.Label id="description" name="Descrição">
          <Input.TextArea placeholder="Descreva um pouco sobre a oportunidade" />
        </Input.Label>

        <div>
          <Skills
            onAddSkill={() => {
              console.log('')
            }}
            onRemoveSkill={() => {
              console.log('')
            }}
            skills={[]}
          />
        </div>

        <Button>Criar oportunidade</Button>
      </form>
    </div>
  )
}
