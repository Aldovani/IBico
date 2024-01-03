import { Skills } from '@/components/Skills/SkillsList'
import { useAuth } from '@/hooks/useAuth'
import { UserRepository } from '@/services/api/repositories/user'
import { toast } from '@/utils/toast'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export function useConfig() {
  const router = useRouter()
  const { user, getUser } = useAuth()
  const [skills, setSkills] = useState<Skills[]>(() => {
    const data = user?.skills.map((skill) => {
      return { name: skill, id: Math.random() }
    })

    return data as Skills[]
  })

  const { mutate, isLoading } = useMutation({
    mutationKey: ['UPDATE_SKILLS'],
    mutationFn: handleUpdate,
    onSuccess: () => {
      getUser()
      toast({
        title: 'Sucesso',
        text: 'alteração das competências realizada com sucesso',
        type: 'SUCCESS',
      })
      router.push('/opportunities')
    },
  })

  async function handleUpdate() {
    if (!user) return
    UserRepository.updateUser({
      cellphone: user.cellphone,
      skills: skills.map((skill) => skill.name),
      cpf: user.cpf,
      currentPassword: undefined,
      newPassword: undefined,
      name: user.name,
      username: user.username,
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
    isLoading,
  }
}
