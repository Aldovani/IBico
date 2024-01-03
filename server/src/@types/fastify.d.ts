import '@fastify/jwt'

type FilesInRequest = FilesObject | Partial<File>[]

declare module 'fastify' {
  interface FastifyRequest {
    isMultipart: typeof isMultipart
    file: File & { filename: string }
    files: FilesInRequest
  }
}
