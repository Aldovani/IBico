import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { CreateOpportunityUseCase } from '@/domain/portal/application/use-cases/opportunities/create-opportunity'
import { DayjsDateProvider } from '@/core/containers/providers/dateProvider/implementations/day-js-date-provider'

const dayjsDateProvide = new DayjsDateProvider()

const createOpportunityQuerySchema = z
  .object({
    title: z.string().min(8),
    description: z.string().min(20),
    local: z.string().min(4),
    amount: z.number().min(1),
    startDateTime: z.coerce
      .date()
      .refine(
        (value) => dayjsDateProvide.isBeforeOrSame(value, new Date(), 'd'),
        {
          message: 'Date needs to be after now',
        },
      ),
    endDateTime: z.coerce.date(),
    timeLoad: z.string(),
    skills: z
      .string()
      .array()
      .min(1)
      .transform((args) =>
        Array.from(new Set(args.map((item) => item.toLowerCase().trim()))),
      ),
  })
  .superRefine((values, ctx) => {
    const isEndDateBeforeStartDate = dayjsDateProvide.isBefore(
      values.endDateTime,
      values.startDateTime,
      'd',
    )

    if (isEndDateBeforeStartDate) {
      return ctx.addIssue({
        message: 'End date needs to be after start date ',
        code: 'custom',
        path: ['endDateTime'],
      })
    }
  })

type CreateOpportunityQuerySchema = z.infer<typeof createOpportunityQuerySchema>

export class CreateOpportunityController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const createOpportunityUseCase = container.resolve(CreateOpportunityUseCase)
    const {
      amount,
      description,
      endDateTime,
      local,
      skills,
      startDateTime,
      timeLoad,
      title,
    } = ZodValidationPipe.transform<CreateOpportunityQuerySchema>(
      createOpportunityQuerySchema,
      req.body,
    )

    const response = await createOpportunityUseCase.execute({
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
      },
    })

    if (response.isRight()) {
      return res.status(201).send({
        status: 201,
        message: 'Opportunity created',
      })
    }
  }
}
