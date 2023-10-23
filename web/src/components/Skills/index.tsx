import { Input } from '../Input'
import { useSkills } from './useSkills'
import { Skills, SkillsList } from './SkillsList'

type SkillProps = {
  onAddSkill: (data: Skills) => void
  onRemoveSkill: (id: number) => void
  skills: Skills[]
}

export function Skills({ onAddSkill, onRemoveSkill, skills }: SkillProps) {
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
          id="skills"
          placeholder="Digite sua competência"
          onKeyDown={(e) => handleKeyDown(e)}
          error={!!errors.skills}
        />
        <Input.MessageError message={errors.skills?.message} />
      </Input.Label>

      <SkillsList skills={skills} onRemove={onRemoveSkill} />
    </>
  )
}
