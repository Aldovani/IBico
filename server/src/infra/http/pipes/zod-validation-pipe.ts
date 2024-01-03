import { BadRequestException } from '@/core/errors/erros/bad-request-exception'
import { ZodError, ZodSchema } from 'zod'

export class ZodValidationPipe {
  static transform<T>(schema: ZodSchema, value: unknown) {
    try {
      return schema.parse(value) as T
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: 'Validation failed',
          errors: error.format(),
        })
      }
    }
    return value as T
  }
}
