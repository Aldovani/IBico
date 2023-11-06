import { Skills } from '@/components/Skills/SkillsList'
import { useAuth } from '@/hooks/useAuth'
import { User } from '@/services/api/repositories/user'
import { useMutation } from '@tanstack/react-query'
import { FormEvent, useState } from 'react'

// FIXME: Arrumar as skills (fazer request para /user ou salvar no useState)

export function useSkills() {
  const { user } = useAuth()
  const [skills, setSkills] = useState<Skills[]>(() => {
    const data = user?.skills.map((skill) => {
      return { name: skill.name, id: Math.random() }
    })

    return data as Skills[]
  })

  const { mutate, isLoading } = useMutation({
    mutationKey: ['UPDATE_SKILLS'],
    mutationFn: () => User.updateUser({ skills, passwd: 'Dodo1234.' }),
  })

  function handleAddSkill({ id, name }: Skills) {
    setSkills((prev) => [...prev, { id, name }])
  }

  function removeSkill(id: number) {
    setSkills((prev) => prev.filter((data) => data.id !== id))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    mutate()
  }

  return {
    handleAddSkill,
    handleSubmit,
    skills,
    removeSkill,
    user,
    mutate,
    isLoading,
  }
}
