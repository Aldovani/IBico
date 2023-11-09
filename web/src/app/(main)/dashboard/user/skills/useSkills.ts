import { Skills } from '@/components/Skills/SkillsList'
import { User as UserType } from '@/contexts/authContext'
import { useAuth } from '@/hooks/useAuth'
import { User } from '@/services/api/repositories/user'
import { toast } from '@/utils/toast'
import { useMutation } from '@tanstack/react-query'
import { FormEvent, useState } from 'react'

export function useSkills() {
  const { user, getUser } = useAuth()
  const [skills, setSkills] = useState<Skills[]>(() => {
    const data = user?.skills.map((skill) => {
      return { name: skill.name, id: Math.random() }
    })

    return data as Skills[]
  })

  const { mutate, isLoading } = useMutation({
    mutationKey: ['UPDATE_SKILLS'],
    mutationFn: () =>
      User.updateUser({
        currentData: user as UserType,
        payload: {
          skills,
        },
      }),
    onSuccess: () => {
      getUser()
      toast({
        title: 'Sucesso',
        text: 'alteração das competências realizada com sucesso',
        type: 'SUCCESS',
      })
    },
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
