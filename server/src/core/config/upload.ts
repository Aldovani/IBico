import { resolve } from 'path'
import multer from 'fastify-multer'
import { randomUUID } from 'crypto'

export const tmpFolder = resolve(__dirname, '..', '..', '..', 'tmp')

export const storage = multer.diskStorage({
  destination: tmpFolder,

  filename: function (req, file, cb) {
    const uuid = randomUUID()
    const fileName = `${uuid}-${file.originalname}`
    return cb(null, fileName)
  },
})

export const upload = multer({
  dest: '/tmp',
  storage,
})
