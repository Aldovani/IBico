import { ControllerError } from '../controller-error'

type BadRequestExceptionProps = {
  message: string
  errors: unknown
}

export class BadRequestException implements ControllerError {
  public message: string
  public errors: unknown

  constructor({ errors, message }: BadRequestExceptionProps) {
    this.errors = errors
    this.message = message
  }
}
