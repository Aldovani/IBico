'use client'
import { Skills } from '@/components/Skills/SkillsList'
import { Opportunity } from '@/services/api/repositories/opportunity'
import { validateDate } from '@/utils/validateDate'
import { zodResolver } from '@hookform/resolvers/zod'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type useOpportunityFormProps = {
  initialData?: Opportunity
}

export function useOpportunityForm({ initialData }: useOpportunityFormProps) {
  const [skills, setSkills] = useState<Skills[]>([])

  useEffect(() => {
    setSkills(() => {
      if (!initialData) return []
      const data = initialData.necessarySkills.map((skill) => {
        return { name: skill.name, id: Math.random() }
      })
      return data as Skills[]
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
      value: z.coerce.number().min(1),
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
      description: initialData?.description || '',
      endDateTime: initialData?.endDateTime || '',
      local: initialData?.local || '',
      startDateTime: initialData?.startDateTime || '',
      timeLoad: initialData?.timeLoad || '',
      title: initialData?.title || '',
      value: initialData?.value || 0,
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
  }
}
