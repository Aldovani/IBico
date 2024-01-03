import { Input } from '../Input'
import { useSkills } from './useSkills'
import { Skills as SkillsType, SkillsList } from './SkillsList'

type SkillProps = {
  onAddSkill: (data: SkillsType) => void
  onRemoveSkill: (id: number) => void
  skills: SkillsType[]
  isLoading?: boolean
}

export function Skills({
  onAddSkill,
  onRemoveSkill,
  skills,
  isLoading = false,
}: SkillProps) {
  const { clearErrors, errors, register, handleKeyDown } = useSkills({
    handleAddSkill: onAddSkill,
    skills,
  })

  return (
    <>
      <Input.Label id="skills" error={!!errors.skills} name="Competência">
        <Input.Field
          {...register('skills', {
            onBlur() {
              clearErrors('skills')
            },
          })}
          isLoading={isLoading}
          id="skills"
          placeholder="Digite sua competência"
          onKeyDown={(e) => handleKeyDown(e)}
          error={!!errors.skills}
        />
        <Input.MessageError message={errors.skills?.message} />
      </Input.Label>
      <div className="mt-4">
        <SkillsList skills={skills} onRemove={onRemoveSkill} />
      </div>
    </>
  )
}
