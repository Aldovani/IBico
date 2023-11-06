'use client'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Skills } from '@/components/Skills'
import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'
import { useCreateOpportunity } from './useCreateOpportunity'

export default function CreateOpportunity() {
  const {
    register,
    errors,
    handleAddSkill,
    handleRemoveSkill,
    handleSubmit,
    skills,
    isLoading,
    mutate,
  } = useCreateOpportunity()
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

      <form
        onSubmit={handleSubmit(
          ({
            description,
            endDateTime,
            local,
            startDateTime,
            timeLoad,
            title,
            value,
          }) => {
            mutate({
              description,
              endDateTime,
              local,
              startDateTime,
              timeLoad,
              title,
              value,
              necessarySkills: skills,
            })
          },
        )}
      >
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-8 max-md:grid-cols-1">
          <Input.Label id="title" name="Titulo" error={!!errors.title}>
            <Input.Field
              {...register('title')}
              error={!!errors.title}
              placeholder="Digite o titulo da oportunidade"
            />
            <Input.MessageError message={errors.title?.message} />
          </Input.Label>

          <Input.Label error={!!errors.local} id="place" name="Local">
            <Input.Field
              id="place"
              error={!!errors.local}
              {...register('local')}
              placeholder="Digite o local da oportunidade"
            />
            <Input.MessageError message={errors.local?.message} />
          </Input.Label>

          <Input.Label
            id="date-started"
            className="flex-1"
            error={!!errors.startDateTime}
            name="Data de inicio"
          >
            <Input.Field
              id="date-started"
              {...register('startDateTime')}
              type="datetime-local"
              error={!!errors.startDateTime}
            />
            <Input.MessageError message={errors.startDateTime?.message} />
          </Input.Label>
          <Input.Label
            id="date-finished"
            error={!!errors.endDateTime}
            className="flex-1"
            name="Data de termino"
          >
            <Input.Field
              error={!!errors.endDateTime}
              id="date-finished"
              {...register('endDateTime')}
              type="datetime-local"
            />
            <Input.MessageError message={errors.endDateTime?.message} />
          </Input.Label>
          <Input.Label error={!!errors.value} id="value" name="valor">
            <Input.Field
              id="value"
              type="number"
              error={!!errors.value}
              {...register('value')}
              placeholder="Digite o valor da oportunidade"
            />
            <Input.MessageError message={errors.value?.message} />
          </Input.Label>

          <Input.Label
            error={!!errors.timeLoad}
            id="timeLoad"
            name="Carga horaria"
          >
            <Input.Field
              id="timeLoad"
              error={!!errors.timeLoad}
              {...register('timeLoad')}
              placeholder="Digite a carga da oportunidade "
            />
            <Input.MessageError message={errors.timeLoad?.message} />
          </Input.Label>

          <Input.Label
            id="description"
            error={!!errors.description}
            name="Descrição"
          >
            <Input.TextArea
              id="description"
              error={!!errors.description}
              {...register('description')}
              placeholder="Descreva um pouco sobre a oportunidade"
            />
            <Input.MessageError message={errors.description?.message} />
          </Input.Label>

          <div>
            <Skills
              onAddSkill={handleAddSkill}
              onRemoveSkill={handleRemoveSkill}
              skills={skills}
            />
          </div>
        </div>

        <Button loading={isLoading} className="mt-4">
          Criar oportunidade
        </Button>
      </form>
    </div>
  )
}
