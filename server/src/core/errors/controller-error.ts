import { ValidationError } from 'zod-validation-error'

export interface ControllerError {
  message: string
  errors: ValidationError
}
