import { zodResolver } from '@hookform/resolvers/zod'
import { KeyboardEvent, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Skills } from './SkillsList'

type UseSkillsProps = {
  handleAddSkill: (data: Skills) => void
  skills: Skills[]
}

export function useSkills({ handleAddSkill, skills }: UseSkillsProps) {
  const skillsSchema = z.object({
    skills: z.coerce
      .string()
      .min(3, 'Deve conter no mínimo 03 caracteres')
      .optional(),
  })

  type SkillsSchema = z.infer<typeof skillsSchema>

  const {
    register,
    getValues,
    resetField,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<SkillsSchema>({
    resolver: zodResolver(skillsSchema),
    mode: 'onChange',
  })

  useEffect(() => {
    resetField('skills')
  }, [resetField, skills])

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()

      const currentValue = getValues('skills')
      if (currentValue && currentValue.length >= 3) {
        handleAddSkill({ name: currentValue, id: Math.random() })
        return
      }
      setError('skills', {
        message: 'Deve conter no mínimo 03 caracteres',
        type: 'minLength',
      })
    }
  }

  return {
    register,
    skills,
    errors,
    clearErrors,
    handleKeyDown,
  }
}
