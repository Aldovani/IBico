import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { EditOpportunityUseCase } from '@/domain/portal/application/use-cases/opportunities/edit-opportunity'
import { ResourceNotFoundError } from '@/core/errors/erros/resource-not-found-error'
import { DayjsDateProvider } from '@/core/containers/providers/dateProvider/implementations/day-js-date-provider'
import { OpportunityPresenter } from '../../presenters/opportunity-presenter'

const dayjsDateProvide = new DayjsDateProvider()

const editOpportunityQuerySchema = z
  .object({
    title: z.string().min(8),
    description: z.string().min(20),
    local: z.string().min(8),
    amount: z.number().min(1),
    startDateTime: z.coerce
      .date()
      .refine((value) => dayjsDateProvide.compareIfAfter(value, new Date()), {
        message: 'Date needs to be after now',
      }),
    endDateTime: z.coerce.date(),
    timeLoad: z.string(),
    status: z.enum(['CREATED', 'DISABLED']).default('CREATED'),
    skills: z
      .string()
      .array()
      .min(1)

      .transform((args) =>
        Array.from(new Set(args.map((item) => item.toLowerCase().trim()))),
      ),
  })
  .superRefine((values, ctx) => {
    const isEndDateBeforeStartDate = dayjsDateProvide.compareIfAfter(
      values.startDateTime,
      values.endDateTime,
    )

    if (isEndDateBeforeStartDate) {
      return ctx.addIssue({
        message: 'End date needs to be after start date ',
        code: 'custom',
        path: ['endDateTime'],
      })
    }
  })

const editOpportunityParamsSchema = z.object({
  id: z.string().uuid(),
})

type EditOpportunityQuerySchema = z.infer<typeof editOpportunityQuerySchema>
type EditOpportunityParamsSchema = z.infer<typeof editOpportunityParamsSchema>

export class EditOpportunityController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const editOpportunityUseCase = container.resolve(EditOpportunityUseCase)
    const {
      amount,
      description,
      endDateTime,
      local,
      skills,
      startDateTime,
      timeLoad,
      title,
      status,
    } = ZodValidationPipe.transform<EditOpportunityQuerySchema>(
      editOpportunityQuerySchema,
      req.body,
    )

    const { id } = ZodValidationPipe.transform<EditOpportunityParamsSchema>(
      editOpportunityParamsSchema,
      req.params,
    )

    const response = await editOpportunityUseCase.execute({
      userId: req.user.id,
      opportunity: {
        amount,
        description,
        endDateTime,
        local,
        skills,
        startDateTime,
        timeLoad,
        title,
        status,
      },
      opportunityId: id,
    })

    if (response.isLeft()) {
      const value = response.value

      switch (value.constructor) {
        case ResourceNotFoundError:
          return res.status(404).send({
            message: value.message,
            status: 404,
          })
      }
    }

    if (response.isRight()) {
      const opportunity = OpportunityPresenter.toHTTP(
        response.value.opportunity,
      )
      return res.status(200).send({
        status: 200,
        message: 'Opportunity edited',
        data: opportunity,
      })
    }
  }
}
