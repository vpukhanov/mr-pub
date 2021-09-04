import { Express } from 'express'

const ALLOWED_MIMETYPES = ['text/x-diff', 'text/x-patch']

export function validateFile(file: Express.Multer.File) {
  if (!file) {
    throw new Error('no file was passed to the uploader')
  }
  if (!ALLOWED_MIMETYPES.includes(file.mimetype)) {
    throw new Error(`mime-type ${file.mimetype} is not allowed`)
  }
}
