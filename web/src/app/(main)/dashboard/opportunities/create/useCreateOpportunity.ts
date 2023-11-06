import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { Skills } from '@/components/Skills/SkillsList'
import { validateDate } from '@/utils/validateDate'
import { useMutation } from '@tanstack/react-query'
import { Opportunity } from '@/services/api/repositories/opportunity'
import { toast } from '@/utils/toast'
import { useRouter } from 'next/navigation'

export function useCreateOpportunity() {
  const [skills, setSkills] = useState<Skills[]>([])
  const router = useRouter()

  const createOpportunitySchema = z
    .object({
      title: z.string().min(4),
      description: z.string().min(10),
      startDateTime: z.coerce
        .date()
        .refine(validateDate, { message: 'Data invalida' }),
      endDateTime: z.coerce
        .date()
        .refine(validateDate, { message: 'Data invalida' }),
      timeLoad: z.string().min(1),
      local: z.string().min(5),
      value: z.coerce.number().min(1),
    })
    .superRefine(({ startDateTime, endDateTime }, ctx) => {
      const isEndDateValid = endDateTime.getTime() > startDateTime.getTime()
      if (!isEndDateValid) {
        ctx.addIssue({
          message: 'Data final deve ser maior que inicial',
          path: ['endDateTime'],
          code: 'custom',
        })
      }
    })

  type createOpportunitySchema = z.infer<typeof createOpportunitySchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createOpportunitySchema>({
    resolver: zodResolver(createOpportunitySchema),
  })

  const { mutate, isLoading } = useMutation({
    mutationKey: ['CREATE_OPPORTUNITY'],
    mutationFn: Opportunity.createOpportunity,
    onSuccess: () => {
      toast({
        title: 'Sucesso',
        text: 'Oportunidade criada com sucesso',
        type: 'SUCCESS',
      })
      router.push('/dashboard/opportunities')
    },
  })

  function handleAddSkill({ id, name }: Skills) {
    setSkills((prev) => [...prev, { id, name }])
  }

  function handleRemoveSkill(id: number) {
    setSkills((prev) => prev.filter((data) => data.id !== id))
  }

  return {
    register,
    handleSubmit,
    errors,
    handleRemoveSkill,
    handleAddSkill,
    skills,
    mutate,
    isLoading,
  }
}
