import { Skills } from '@/components/Skills/SkillsList'
import { FormEvent, useState } from 'react'

export function useConfig() {
  const [skills, setSkills] = useState<Skills[]>([])

  function handleAddSkill({ id, name }: Skills) {
    setSkills((prev) => [...prev, { id, name }])
  }

  function removeSkill(id: number) {
    setSkills((prev) => prev.filter((data) => data.id !== id))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return {
    handleAddSkill,
    handleSubmit,
    skills,
    removeSkill,
  }
}
