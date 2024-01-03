'use client'
import { Skills } from '@/components/Skills/SkillsList'
import { Opportunity } from '@/services/api/repositories/opportunity'
import { validateDate } from '@/utils/validateDate'
import { zodResolver } from '@hookform/resolvers/zod'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type useOpportunityFormProps = {
  initialData?: {
    data: Opportunity
  }
}

export function useOpportunityForm({ initialData }: useOpportunityFormProps) {
  const [skills, setSkills] = useState<Skills[]>([])

  useEffect(() => {
    setSkills(() => {
      if (!initialData) return []
      return initialData.data.skills.map((skill) => ({
        id: Math.random(),
        name: skill,
      }))
    })
  }, [initialData])

  const opportunitySchema = z
    .object({
      title: z.string().min(4),
      description: z.string().min(10),
      startDateTime: z.coerce
        .string()
        .refine(validateDate, { message: 'Data invalida' }),
      endDateTime: z.coerce
        .string()
        .refine(validateDate, { message: 'Data invalida' }),
      timeLoad: z.string().min(1),
      local: z.string().min(5),
      amount: z.coerce.number().min(1),
    })
    .superRefine(({ startDateTime, endDateTime }, ctx) => {
      const isEndDateValid =
        new Date(endDateTime).getTime() > new Date(startDateTime).getTime()

      if (!isEndDateValid) {
        ctx.addIssue({
          message: 'Data final deve ser maior que inicial',
          path: ['endDateTime'],
          code: 'custom',
        })
      }
    })

  type OpportunitySchema = z.infer<typeof opportunitySchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OpportunitySchema>({
    resolver: zodResolver(opportunitySchema),
    values: {
      description: initialData?.data.description || '',
      endDateTime: initialData?.data.endDateTime || '',
      local: initialData?.data.local || '',
      startDateTime: initialData?.data?.startDateTime || '',
      timeLoad: initialData?.data.timeLoad || '',
      title: initialData?.data.title || '',
      amount: initialData?.data.amount || 0,
    },
  })

  function handleAddSkill({ name }: Skills) {
    setSkills((prev) => [...prev, { name, id: Math.random() }])
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
  }
}
