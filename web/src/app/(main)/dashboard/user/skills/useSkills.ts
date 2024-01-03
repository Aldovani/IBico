import { Skills } from '@/components/Skills/SkillsList'
import { useAuth } from '@/hooks/useAuth'
import { UserRepository } from '@/services/api/repositories/user'
import { toast } from '@/utils/toast'
import { useMutation } from '@tanstack/react-query'
import { FormEvent, useState } from 'react'

export function useSkills() {
  const { user } = useAuth()
  const [skills, setSkills] = useState<Skills[]>(() => {
    const data = user?.skills.map((skill) => {
      return { name: skill, id: Math.random() }
    })

    return data as Skills[]
  })

  const { mutate, isLoading } = useMutation({
    mutationKey: ['UPDATE_SKILLS'],
    mutationFn: updateUser,

    onSuccess: async () => {
      toast({
        title: 'Sucesso',
        text: 'alteração das competências realizada com sucesso',
        type: 'SUCCESS',
      })
      await UserRepository.getUser()
    },
  })

  async function updateUser() {
    if (!user) return
    UserRepository.updateUser({
      cellphone: user.cpf,
      cpf: user.cpf,
      name: user.name,
      username: user.username,
      skills: skills.map((skill) => skill.name),
      currentPassword: undefined,
      newPassword: undefined,
    })
  }

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
