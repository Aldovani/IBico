import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Skills } from '@/components/Skills'
import { useOpportunityForm } from './useOpportunityForm'
import { Opportunity } from '@/services/api/repositories/opportunity'

type handleRequestPayload = Omit<
  Opportunity,
  'postedBy' | 'createdAt' | 'status' | 'id'
>

type OpportunityFormProps = {
  handleRequest: (data: handleRequestPayload) => void
  isLoading: boolean
  initialData?: Opportunity
  isDataLoading?: boolean
}

export function OpportunityForm({
  handleRequest,
  isLoading,
  initialData,
  isDataLoading = false,
}: OpportunityFormProps) {
  const {
    errors,
    handleAddSkill,
    handleRemoveSkill,
    handleSubmit,
    register,
    skills,
  } = useOpportunityForm({ initialData })

  return (
    <form
      onSubmit={handleSubmit((data) => {
        handleRequest({
          ...data,
          endDateTime: data.endDateTime,
          startDateTime: data.startDateTime,
          necessarySkills: skills,
        })
      })}
    >
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-8 max-md:grid-cols-1">
        <Input.Label id="title" name="Titulo" error={!!errors.title}>
          <Input.Field
            isLoading={isDataLoading}
            {...register('title')}
            error={!!errors.title}
            placeholder="Digite o titulo da oportunidade"
          />
          <Input.MessageError message={errors.title?.message} />
        </Input.Label>

        <Input.Label error={!!errors.local} id="place" name="Local">
          <Input.Field
            id="place"
            isLoading={isDataLoading}
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
            isLoading={isDataLoading}
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
            isLoading={isDataLoading}
            {...register('endDateTime')}
            type="datetime-local"
          />
          <Input.MessageError message={errors.endDateTime?.message} />
        </Input.Label>
        <Input.Label error={!!errors.value} id="value" name="valor">
          <Input.Field
            id="value"
            isLoading={isDataLoading}
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
            isLoading={isDataLoading}
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
            isLoading={isDataLoading}
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
  )
}
